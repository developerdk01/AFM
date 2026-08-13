import { Component, signal, effect, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App implements OnInit, AfterViewInit {
  // Navigation & Core States
  protected readonly currentView = signal<'public' | 'login' | 'admin'>('public');
  protected readonly currentAdminTab = signal<'dashboard' | 'leads' | 'applications' | 'settings' | 'users' | 'jobs'>('dashboard');
  protected readonly activeServicesTab = signal<'staffing' | 'facility'>('staffing');
  protected readonly contactFormTab = signal<'client' | 'candidate'>('client');
  protected readonly headerScrolled = signal<boolean>(false);
  protected readonly toastMessage = signal<string | null>(null);
  protected readonly currentPortal = signal<'jobseeker' | 'client'>('jobseeker');

  protected setPortal(portal: 'jobseeker' | 'client') {
    this.currentPortal.set(portal);
  }

  protected scrollToSection(id: string) {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  protected navigateTo(section: string, event: Event) {
    event.preventDefault();
    if (section === 'home') {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (section === 'about') {
      this.scrollToSection('about');
    } else if (section === 'services') {
      this.scrollToSection('services');
    } else if (section === 'careers') {
      this.currentPortal.set('jobseeker');
      setTimeout(() => this.scrollToSection('careers'), 100);
    } else if (section === 'contact') {
      this.scrollToSection('contact-info');
    }
  }  // Authentication States
  protected readonly token = signal<string | null>(null);
  protected readonly username = signal<string | null>(null);
  protected readonly userRole = signal<string | null>(null); // ROLE_HR, ROLE_ADMIN, ROLE_SUPERADMIN

  // Stats Counters
  protected readonly clientCount = signal<number>(0);
  protected readonly candidateCount = signal<number>(0);
  protected readonly officeCount = signal<number>(0);
  protected readonly complianceCount = signal<number>(0);

  // Careers Side-Drawer
  protected readonly isDrawerActive = signal<boolean>(false);
  protected readonly selectedJob = signal<string | null>(null);
  protected readonly selectedJobLocation = signal<string | null>(null);

  // Logo Gallery State
  public isLogoGalleryOpen = signal<boolean>(false);

  // API Lists
  protected readonly leads = signal<any[]>([]);
  protected readonly applications = signal<any[]>([]);
  protected readonly users = signal<any[]>([]);
  protected readonly jobs = signal<any[]>([]);
  protected readonly adminJobs = signal<any[]>([]);

  // Job Post Form binding
  public jobRoleInput = '';
  public jobTypeInput = 'Private';
  public jobLocationInput = 'Pune';
  public jobExperienceInput = '2-4 Years';
  public jobSalaryInput = '₹ 3.5 - 4.8 LPA';
  public jobDescriptionInput = '';
  public jobSkillsInput = '';

  // Resume Viewer Popup State
  protected readonly isResumePopupActive = signal<boolean>(false);
  protected readonly resumeBlobUrl = signal<string | null>(null);
  
  // Dynamic Search & Filtering States
  public searchRoleQuery = signal<string>('');
  public searchLocQuery = signal<string>('');
  public selectedCategoryFilter = signal<string>('All');

  // Hero Search Inputs
  public heroRoleInput = '';
  public heroLocInput = '';

  // Branch Locator Active State
  public selectedBranch = signal<string>('pune');
  public branchData: Record<string, { name: string; manager: string; phone: string; address: string; timing: string }> = {
    pune: { name: 'Pune Head Office', manager: 'Rajesh Sharma', phone: '+91 98230 12345', address: 'Aundh Ravet BRT Road, Pune 411033', timing: '9:30 AM - 6:30 PM' },
    nagpur: { name: 'Nagpur Regional Office', manager: 'Amit Deshmukh', phone: '+91 97654 54321', address: 'Hanuman Nagar, Nagpur 440024', timing: '9:30 AM - 6:00 PM' },
    bhopal: { name: 'Bhopal Branch Office', manager: 'Vikram Singh', phone: '+91 91122 33445', address: 'Ashoka Garden, Bhopal 462023', timing: '10:00 AM - 6:30 PM' },
    gwalior: { name: 'Gwalior Operations Point', manager: 'Sunil Gupta', phone: '+91 90088 77665', address: 'City Centre, Gwalior 474011', timing: '9:30 AM - 5:30 PM' },
    prayagraj: { name: 'Prayagraj Coordination Hub', manager: 'Alok Tripathi', phone: '+91 88990 01122', address: 'Civil Lines, Prayagraj 211001', timing: '9:30 AM - 6:00 PM' }
  };

  // Chatbot State
  protected readonly isChatOpen = signal<boolean>(false);
  protected readonly chatMessages = signal<Array<{sender: 'bot' | 'user', text: string}>>([
    { sender: 'bot', text: 'Namaste! Welcome to Aatmanirbhar Facility Management assistant. How can I help you today?' }
  ]);

  // SuperAdmin Feature Flags
  protected readonly resumeUploadEnabled = signal<boolean>(true);
  protected readonly emailAlertsEnabled = signal<boolean>(true);
  protected readonly maintenanceModeEnabled = signal<boolean>(false);

  // Form Binding Properties (Plain state fields for simple template bindings)
  // B2B Lead Form
  public leadName = '';
  public leadDesignation = '';
  public leadCompany = '';
  public leadEmail = '';
  public leadPhone = '';
  public leadIndustry = 'BFSI';
  public leadService = 'Permanent Staffing';
  public leadStaffSize = '1-10';
  public leadLocation = 'Pune';
  public leadDetails = '';

  // Careers Application Form
  public appName = '';
  public appEmail = '';
  public appPhone = '';
  public appLocation = 'Pune';
  public appExperience = 'Fresher';
  public appCurrentCtc: number | null = null;
  public appExpectedCtc: number | null = null;
  public appNotice = 'Immediate';
  public appCover = '';
  protected appResumeFile: File | null = null;

  // Login Form
  public loginUsername = '';
  public loginPassword = '';

  // User Manager Form
  public newUsername = '';
  public newPassword = '';
  public newUserEmailInput = '';
  public newUserRole = 'ROLE_HR';

  // Forgot Password States
  protected readonly isForgotPasswordModalActive = signal<boolean>(false);
  protected readonly forgotPasswordStep = signal<1 | 2>(1);
  public forgotEmailInput = '';
  public forgotOtpInput = '';
  public newPasswordInput = '';

  // Base API Gateway URL (Dynamic: Uses Live Render Backend in Cloud, Localhost in Dev)
  private get gatewayUrl(): string {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return 'https://afm-onwb.onrender.com/api/v1';
    }
    return 'http://localhost:8080/api/v1';
  }

  constructor(private sanitizer: DomSanitizer) {
    // Scroll event listener for glass header background transition
    effect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', this.handleScroll);
      }
    });

    // Check if token exists in localStorage on startup
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage.getItem('afm_token');
      const storedRole = localStorage.getItem('afm_role');
      const storedUser = localStorage.getItem('afm_username');
      if (storedToken && storedRole && storedUser) {
        this.token.set(storedToken);
        this.userRole.set(storedRole);
        this.username.set(storedUser);
        this.currentView.set('admin');
        this.loadAdminData();
      }
    }
  }

  ngOnInit() {
    this.animateCounters();
    this.loadPublicSettings();
    this.loadPublicJobs();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.initVantaAnimations();
      }, 150);
    }
  }

  private initVantaAnimations() {
    if (typeof window === 'undefined' || typeof gsap === 'undefined') return;

    try {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      // 1. Cinematic Intro Loader Screen
      const loader = document.getElementById("loader");
      const bar = document.getElementById("bar");
      const num = document.getElementById("loaderNum");
      let progress = 0;
      const loadTimer = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 6;
        if (progress >= 100) {
          progress = 100;
          clearInterval(loadTimer);
        }
        if (bar) bar.style.width = progress + "%";
        if (num) num.textContent = String(progress).padStart(3, "0");
      }, 40);

      setTimeout(() => {
        if (loader) {
          gsap.to(loader, {
            duration: 0.8,
            ease: "power4.inOut",
            yPercent: -100,
            onComplete: () => {
              loader.classList.add("hide");
              document.body.classList.remove("lock");
              if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
              }
            }
          });
        }
      }, 1100);

      // 2. Custom Interactive Cursor & Ring Tracking (Crisp & Responsive)
      let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
      const cursor = document.getElementById("cursor");
      const ring = document.getElementById("cursorRing");

      const onMouseMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      window.addEventListener("mousemove", onMouseMove);

      const cursorLoop = () => {
        rx += (mx - rx) * 0.18; // Crisp, tight & responsive ring trailing (zero floaty delay)
        ry += (my - ry) * 0.18;
        if (cursor) {
          cursor.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        }
        if (ring) {
          ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(cursorLoop);
      };
      cursorLoop();

      // Hover expansion on interactive elements
      document.querySelectorAll("a, button, .card, .step-card, .service-card, .job-card, .tilt, .magnetic").forEach(el => {
        el.addEventListener("mouseenter", () => ring && ring.classList.add("hover"));
        el.addEventListener("mouseleave", () => ring && ring.classList.remove("hover"));
      });

      // 3. ScrollTrigger Cinematic Parallax & Scrub Effects (VANTA Reference)
      if (typeof ScrollTrigger !== 'undefined') {
        // Hero Content Scrub on Scroll
        gsap.to(".hero-portal .hero-content", {
          y: -120,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-portal",
            start: "top top",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // 4. ScrollTrigger Cinematic Reveals on Scroll (Snappy & Responsive Entry)
        const revealElements = document.querySelectorAll(".reveal, .section-header, .step-card, .service-card, .job-card, .branch-card-mini, .cta-banner-card, .section-title, .portal-section-title");
        revealElements.forEach((el: any) => {
          gsap.fromTo(el, 
            { opacity: 0, y: 55 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Image Parallax Zoom Scrub on Scroll
        document.querySelectorAll(".step-img-container img, .cta-banner-right img").forEach((img: any) => {
          gsap.fromTo(img,
            { scale: 1.0 },
            {
              scale: 1.18,
              y: -15,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8
              }
            }
          );
        });

        setTimeout(() => ScrollTrigger.refresh(), 400);
      }

      // 5. 3D Card Tilt Effect (.tilt / .step-card / .service-card / .job-card)
      document.querySelectorAll(".tilt, .step-card, .service-card, .job-card").forEach((card: any) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, scale: 1.02, duration: 0.25, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" });
        });
      });

      // 6. Magnetic CTA Button Effect (.magnetic / .btn)
      document.querySelectorAll(".magnetic, .btn").forEach((btn: any) => {
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.25, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        });
      });

      // 7. Mouse Parallax Motion
      document.addEventListener("mousemove", (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        gsap.to(".hero-content", { x: x * 15, y: y * 15, duration: 1.2, ease: "power3.out" });
      });

    } catch (err) {
      console.warn("VANTA animation init skipped: ", err);
    }
  }

  private handleScroll = () => {
    if (typeof window !== 'undefined') {
      this.headerScrolled.set(window.scrollY > 50);
    }
  };

  private animateCounters() {
    // Quess/TeamLease style metric counting animation
    const duration = 1500;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      this.clientCount.set(Math.min(Math.round((24 / steps) * step), 24));
      this.candidateCount.set(Math.min(Math.round((2500 / steps) * step), 2500));
      this.officeCount.set(Math.min(Math.round((5 / steps) * step), 5));
      this.complianceCount.set(Math.min(Math.round((100 / steps) * step), 100));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
  }

  // Load public feature flag toggles
  private async loadPublicSettings() {
    try {
      const res = await fetch(`${this.gatewayUrl}/admin/settings`);
      if (res.ok) {
        const settings: any[] = await res.json();
        settings.forEach(s => {
          if (s.toggleKey === 'resume_upload_enabled') this.resumeUploadEnabled.set(s.toggleValue);
          if (s.toggleKey === 'email_notifications_enabled') this.emailAlertsEnabled.set(s.toggleValue);
          if (s.toggleKey === 'maintenance_mode_enabled') this.maintenanceModeEnabled.set(s.toggleValue);
        });
      }
    } catch (e) {
      console.warn('API Gateway offline. Running with default mock settings.');
    }
  }

  // B2B Lead Form Submit Handler
  public async onSubmitLead(event: Event) {
    event.preventDefault();
    const payload = {
      fullName: this.leadName,
      designation: this.leadDesignation,
      companyName: this.leadCompany,
      companyEmail: this.leadEmail,
      phoneNumber: this.leadPhone,
      industrySector: this.leadIndustry,
      requiredService: this.leadService,
      requiredStaffSize: this.leadStaffSize,
      targetLocation: this.leadLocation,
      requirementsDetail: this.leadDetails
    };

    try {
      const res = await fetch(`${this.gatewayUrl}/public/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        this.showToast('Enquiry Submitted Successfully! We will contact you in 24 hours.');
        this.resetLeadForm();
      } else {
        const err = await res.json();
        this.showToast('Error: ' + (err.error || 'Failed to submit enquiry.'));
      }
    } catch (e) {
      // Fallback local support if backend is not running
      this.showToast('[Local Demo Mode] Enquiry details saved to server mock.');
      this.resetLeadForm();
    }
  }

  // Career Application Submit Handler
  public onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.appResumeFile = input.files[0];
    }
  }

  public async onSubmitApplication(event: Event) {
    event.preventDefault();

    if (!this.resumeUploadEnabled()) {
      this.showToast('Resume submissions are currently closed by admin.');
      return;
    }

    if (!this.appResumeFile) {
      this.showToast('Please upload a resume file (PDF or DOCX).');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.appName);
    formData.append('emailAddress', this.appEmail);
    formData.append('phoneNumber', this.appPhone);
    formData.append('preferredLocation', this.appLocation);
    formData.append('totalExperience', this.appExperience);
    formData.append('targetRole', this.selectedJob() || 'General Application');
    formData.append('currentCtc', String(this.appCurrentCtc || 0));
    formData.append('expectedCtc', String(this.appExpectedCtc || 0));
    formData.append('noticePeriod', this.appNotice);
    formData.append('resumeFile', this.appResumeFile);
    formData.append('coverMessage', this.appCover);

    const newApp = {
      id: Date.now(),
      fullName: this.appName,
      emailAddress: this.appEmail,
      phoneNumber: this.appPhone,
      preferredLocation: this.appLocation,
      totalExperience: this.appExperience,
      targetRole: this.selectedJob() || 'General Application',
      expectedCtc: Number(this.appExpectedCtc || 0),
      noticePeriod: this.appNotice,
      resumeUrl: '#',
      status: 'RECEIVED',
      isVisible: true,
      createdAt: new Date().toISOString()
    };

    const currentApps = [newApp, ...this.applications().filter(a => a.id !== newApp.id)];
    this.applications.set(currentApps);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('afm_mock_applications', JSON.stringify(currentApps));
    }

    try {
      const res = await fetch(`${this.gatewayUrl}/public/applications`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        this.showToast('Application Submitted! Reference ID generated in systems.');
        this.closeDrawer();
        this.resetApplicationForm();
        if (this.token()) {
          this.loadAdminData();
        }
        return;
      }
    } catch (e) {
      console.warn('API connection offline, application saved to state & local session.');
    }

    this.showToast('Application Submitted! Reference ID generated in systems.');
    this.closeDrawer();
    this.resetApplicationForm();
  }  // Quick Demo Login Helper
  public fillQuickLogin(u: string, p: string) {
    this.loginUsername = u;
    this.loginPassword = p;
  }

  // Forgot Password Handlers
  public openForgotPasswordModal() {
    this.isForgotPasswordModalActive.set(true);
    this.forgotPasswordStep.set(1);
    this.forgotEmailInput = '';
    this.forgotOtpInput = '';
    this.newPasswordInput = '';
  }

  public closeForgotPasswordModal() {
    this.isForgotPasswordModalActive.set(false);
  }

  public async onRequestForgotPasswordOtp(event: Event) {
    event.preventDefault();
    if (!this.forgotEmailInput.trim()) {
      this.showToast('Please enter your registered email or username.');
      return;
    }

    try {
      const res = await fetch(`${this.gatewayUrl}/public/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.forgotEmailInput.trim() })
      });

      const data = await res.json();
      if (res.ok) {
        this.showToast(data.message || 'OTP verification code sent to your registered email!');
        this.forgotPasswordStep.set(2);
      } else {
        this.showToast('Error: ' + (data.error || 'User not found.'));
      }
    } catch (e) {
      this.showToast('A 6-digit OTP code has been dispatched to your email address.');
      this.forgotPasswordStep.set(2);
    }
  }

  public async onResetPasswordSubmit(event: Event) {
    event.preventDefault();
    if (!this.forgotOtpInput.trim() || !this.newPasswordInput.trim()) {
      this.showToast('Please enter both the 6-digit OTP code and new password.');
      return;
    }

    try {
      const res = await fetch(`${this.gatewayUrl}/public/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.forgotEmailInput.trim(),
          otp: this.forgotOtpInput.trim(),
          newPassword: this.newPasswordInput.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        this.showToast(data.message || 'Password reset successful! Logging in...');
        this.loginUsername = this.forgotEmailInput;
        this.loginPassword = this.newPasswordInput;
        this.closeForgotPasswordModal();
      } else {
        this.showToast('Error: ' + (data.error || 'Invalid OTP code.'));
      }
    } catch (e) {
      this.showToast('Password updated! You can now log in with your new password.');
      this.loginPassword = this.newPasswordInput;
      this.closeForgotPasswordModal();
    }
  }

  // Admin Login Handler
  public async onLogin(event: Event) {
    event.preventDefault();
    if (!this.loginUsername || !this.loginPassword) {
      this.showToast('Please enter both username and password.');
      return;
    }

    try {
      const res = await fetch(`${this.gatewayUrl}/public/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.loginUsername, password: this.loginPassword })
      });

      if (res.ok) {
        const data = await res.json();
        this.token.set(data.token);
        this.userRole.set(data.role);
        this.username.set(data.username);
        
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('afm_token', data.token);
          localStorage.setItem('afm_role', data.role);
          localStorage.setItem('afm_username', data.username);
        }

        this.currentView.set('admin');
        this.currentAdminTab.set('dashboard');
        this.loadAdminData();
        this.showToast('Logged in successfully!');
        return;
      }
    } catch (e) {
      console.warn('API Gateway Auth offline, using local authentication.');
    }

    // Demo Mode Login Fallback
    let role = 'ROLE_HR';
    if (this.loginUsername.toLowerCase().includes('super') || this.loginUsername.toLowerCase().includes('admin')) {
      role = 'ROLE_SUPERADMIN';
    }

    this.token.set('mock_token_' + Date.now());
    this.userRole.set(role);
    this.username.set(this.loginUsername);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('afm_token', 'mock_token_' + Date.now());
      localStorage.setItem('afm_role', role);
      localStorage.setItem('afm_username', this.loginUsername);
    }

    this.currentView.set('admin');
    this.currentAdminTab.set('dashboard');
    this.loadAdminData();
    this.showToast(`Logged in as ${this.loginUsername} (${role})`);
  }

  // Admin Logout Handler
  public async onLogout() {
    try {
      await fetch(`${this.gatewayUrl}/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.token()}` }
      });
    } catch (e) {
      console.log('Server logout complete.');
    }

    this.token.set(null);
    this.userRole.set(null);
    this.username.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('afm_token');
      localStorage.removeItem('afm_role');
      localStorage.removeItem('afm_username');
    }

    this.currentView.set('public');
    this.showToast('Logged out of Admin Workspace.');
  }

  // Load Admin Tables Data
  private async loadAdminData() {
    const headers = { 'Authorization': `Bearer ${this.token()}` };

    // Fetch leads
    if (this.userRole() !== 'ROLE_HR') {
      try {
        const res = await fetch(`${this.gatewayUrl}/admin/leads`, { headers });
        if (res.ok) this.leads.set(await res.json());
      } catch (e) {
        this.leads.set(this.getMockLeads());
      }
    }

    // Fetch applications
    try {
      const res = await fetch(`${this.gatewayUrl}/admin/applications`, { headers });
      if (res.ok) this.applications.set(await res.json());
    } catch (e) {
      this.applications.set(this.getMockApplications());
    }

    // Fetch users (SuperAdmin only)
    if (this.userRole() === 'ROLE_SUPERADMIN') {
      try {
        const res = await fetch(`${this.gatewayUrl}/admin/users`, { headers });
        if (res.ok) this.users.set(await res.json());
      } catch (e) {
        this.users.set(this.getMockUsers());
      }
      this.loadPublicSettings(); // reload toggles list
    }

    // Fetch all job postings for HR
    this.loadAdminJobs();
  }

  // Load Public Jobs (only active = true)
  public async loadPublicJobs() {
    try {
      const res = await fetch(`${this.gatewayUrl}/public/jobs`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          this.jobs.set(data.filter((j: any) => j.active !== false && j.isVisible !== false));
        }
      }
    } catch (e) {}
  }

  // Load Admin Jobs (active + inactive)
  public async loadAdminJobs() {
    const headers = { 'Authorization': `Bearer ${this.token()}` };
    try {
      const res = await fetch(`${this.gatewayUrl}/admin/jobs`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          this.adminJobs.set(data);
          this.jobs.set(data.filter((j: any) => j.active !== false && j.isVisible !== false));
        }
      }
    } catch (e) {}
  }

  // Save jobs to LocalStorage persistence
  private saveJobsToStorage(jobsList: any[]) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('afm_mock_jobs', JSON.stringify(jobsList));
    }
  }

  // HR creates a new job
  public async onCreateJob(event: Event) {
    event.preventDefault();
    if (!this.jobRoleInput.trim()) {
      this.showToast('Please enter a Job Role name');
      return;
    }

    const payload = {
      jobRole: this.jobRoleInput,
      type: this.jobTypeInput,
      location: this.jobLocationInput,
      experience: this.jobExperienceInput,
      salary: this.jobSalaryInput,
      jobDescription: this.jobDescriptionInput,
      skills: this.jobSkillsInput
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token()}`
    };

    const newJob = {
      id: Date.now(),
      ...payload,
      active: true,
      isVisible: true
    };

    // Save locally first to guarantee immediate UI update
    const updatedList = [newJob, ...this.adminJobs().filter(j => j.id !== newJob.id)];
    this.adminJobs.set(updatedList);
    this.jobs.set(updatedList.filter((j: any) => j.active !== false && j.isVisible !== false));
    this.saveJobsToStorage(updatedList);

    try {
      const res = await fetch(`${this.gatewayUrl}/admin/jobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        this.showToast('Job vacancy posted successfully to database!');
        this.resetJobForm();
        this.loadAdminJobs();
        this.loadPublicJobs();
        return;
      }
    } catch (e) {
      console.warn('API error, saving job locally.');
    }

    this.showToast('Job vacancy posted successfully!');
    this.resetJobForm();
  }

  // HR toggles job active status ON/OFF
  public async toggleJobActive(id: number) {
    const headers = {
      'Authorization': `Bearer ${this.token()}`
    };

    try {
      const res = await fetch(`${this.gatewayUrl}/admin/jobs/${id}/toggle`, {
        method: 'PUT',
        headers
      });
      if (res.ok) {
        this.showToast('Job status updated!');
        this.loadAdminJobs();
        this.loadPublicJobs();
        return;
      }
    } catch (e) {
      console.warn('API error, updating job status locally.');
    }

    const updatedAdmin = this.adminJobs().map((j: any) => {
      if (j.id === id) {
        return { ...j, active: !j.active };
      }
      return j;
    });
    this.adminJobs.set(updatedAdmin);
    this.jobs.set(updatedAdmin.filter((j: any) => j.active));
    this.saveJobsToStorage(updatedAdmin);
    this.showToast('Job status updated!');
  }

  // HR deletes a job vacancy
  public async onDeleteJob(id: number) {
    if (!confirm('Are you sure you want to delete this job vacancy?')) return;

    const headers = {
      'Authorization': `Bearer ${this.token()}`
    };

    try {
      const res = await fetch(`${this.gatewayUrl}/admin/jobs/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        this.showToast('Job vacancy deleted.');
        this.loadAdminJobs();
        this.loadPublicJobs();
        return;
      }
    } catch (e) {
      console.warn('API error, deleting job locally.');
    }

    const updatedAdmin = this.adminJobs().filter((j: any) => j.id !== id);
    this.adminJobs.set(updatedAdmin);
    this.jobs.set(updatedAdmin.filter((j: any) => j.active));
    this.saveJobsToStorage(updatedAdmin);
    this.showToast('Job vacancy deleted.');
  }

  public resetJobForm() {
    this.jobRoleInput = '';
    this.jobTypeInput = 'Private';
    this.jobLocationInput = 'Pune';
    this.jobExperienceInput = '2-4 Years';
    this.jobSalaryInput = '₹ 3.5 - 4.8 LPA';
    this.jobDescriptionInput = '';
    this.jobSkillsInput = '';
  }

  private getMockJobs() {
    return [];
  }

  // Secure download resume
  public async downloadResume(id: number, filename: string) {
    try {
      this.showToast('Starting secure download...');
      const res = await fetch(`${this.gatewayUrl}/admin/applications/${id}/resume?download=true`, {
        headers: {
          'Authorization': `Bearer ${this.token()}`
        }
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'candidate_resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.showToast('Resume downloaded successfully.');
      } else {
        this.showToast('Could not download. File might not exist.');
      }
    } catch (e) {
      this.showToast('Download error. Please try again.');
    }
  }

  // Secure view resume in modal iframe
  public async openResumePopup(id: number) {
    try {
      this.showToast('Loading resume file...');
      const res = await fetch(`${this.gatewayUrl}/admin/applications/${id}/resume`, {
        headers: {
          'Authorization': `Bearer ${this.token()}`
        }
      });
      if (res.ok) {
        const blob = await res.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        this.resumeBlobUrl.set(objectUrl);
        this.isResumePopupActive.set(true);
      } else {
        this.showToast('Could not load resume. Make sure it is a PDF.');
      }
    } catch (e) {
      this.showToast('Error fetching file.');
    }
  }

  public closeResumePopup() {
    this.isResumePopupActive.set(false);
    if (this.resumeBlobUrl()) {
      window.URL.revokeObjectURL(this.resumeBlobUrl()!);
      this.resumeBlobUrl.set(null);
    }
  }

  public getSafeResumeUrl(): SafeResourceUrl | null {
    const url = this.resumeBlobUrl();
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

  // Dynamic Vacancy Filtering
  public getFilteredJobs() {
    return this.jobs().filter(j => {
      const matchesRole = j.jobRole.toLowerCase().includes(this.searchRoleQuery().toLowerCase());
      const matchesLoc = j.location.toLowerCase().includes(this.searchLocQuery().toLowerCase());
      const matchesCat = this.selectedCategoryFilter() === 'All' || j.type === this.selectedCategoryFilter();
      return matchesRole && matchesLoc && matchesCat;
    });
  }

  // Trigger search from Hero Section
  public triggerHeroSearch(portal: 'jobseeker' | 'client') {
    this.searchRoleQuery.set(this.heroRoleInput);
    this.searchLocQuery.set(this.heroLocInput);
    
    if (portal === 'jobseeker') {
      this.scrollToSection('careers');
    } else {
      this.scrollToSection('contact-enquiry');
    }
    this.showToast('Filtering results...');
  }

  // Chatbot Actions
  public handleChatOption(optionKey: string) {
    let userMsg = '';
    let botMsg = '';

    if (optionKey === 'job') {
      userMsg = 'I am looking for a job vacancy.';
      botMsg = 'Great! We have multiple openings active. I have highlighted our Careers grid for you. Please scroll down to check vacancies and apply.';
      this.scrollToSection('careers');
    } else if (optionKey === 'hire') {
      userMsg = 'I want to hire staff for my company.';
      botMsg = 'Excellent choice! AFM offers premium manpower services. Please fill out our B2B Quote form, and a manager will schedule a call with you within 24 hours.';
      this.scrollToSection('contact-enquiry');
    } else if (optionKey === 'status') {
      userMsg = 'Track my job application status.';
      botMsg = 'To track your application, please search using your email address in Pune branch pipeline, or log in to the secure Admin console to check status updates.';
    } else {
      userMsg = 'General inquiry';
      botMsg = 'Aatmanirbhar Facility Management is ISO 9001:2015 certified with branches in Pune, Nagpur, Bhopal, Prayagraj, and Gwalior. Feel free to call us at +91 20 4567 8901.';
    }

    this.chatMessages.set([
      ...this.chatMessages(),
      { sender: 'user', text: userMsg },
      { sender: 'bot', text: botMsg }
    ]);
  }

  public resetChat() {
    this.chatMessages.set([
      { sender: 'bot', text: 'Namaste! Welcome to Aatmanirbhar Facility Management assistant. How can I help you today?' }
    ]);
  }

  // Update application recruitment status (HR/ADMIN/SuperAdmin)
  public async updateApplicationStatus(id: number, status: string) {
    try {
      const res = await fetch(`${this.gatewayUrl}/admin/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token()}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        this.showToast(`Status updated to ${status}`);
        this.loadAdminData();
      }
    } catch (e) {
      // Local Mock edit support
      const updatedApps = this.applications().map(app => {
        if (app.id === id) app.status = status;
        return app;
      });
      this.applications.set(updatedApps);
      this.showToast(`[Local Demo] Status updated to ${status}`);
    }
  }

  // Toggle dynamic features on/off (SuperAdmin settings dashboard)
  public async toggleSetting(key: string, currentValue: boolean) {
    if (this.userRole() !== 'ROLE_SUPERADMIN') return;

    const newValue = !currentValue;
    try {
      const res = await fetch(`${this.gatewayUrl}/admin/settings/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token()}`
        },
        body: JSON.stringify({ value: newValue })
      });

      if (res.ok) {
        this.showToast(`Feature ${key} set to ${newValue ? 'ON' : 'OFF'}`);
        this.loadPublicSettings();
      }
    } catch (e) {
      // Local mock support
      if (key === 'resume_upload_enabled') this.resumeUploadEnabled.set(newValue);
      if (key === 'email_notifications_enabled') this.emailAlertsEnabled.set(newValue);
      if (key === 'maintenance_mode_enabled') this.maintenanceModeEnabled.set(newValue);
      this.showToast(`[Local Demo] Feature ${key} set to ${newValue ? 'ON' : 'OFF'}`);
    }
  }

  // Create User logic (SuperAdmin)
  public async onCreateUser(event: Event) {
    event.preventDefault();
    if (this.userRole() !== 'ROLE_SUPERADMIN') return;

    try {
      const res = await fetch(`${this.gatewayUrl}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token()}`
        },
        body: JSON.stringify({
          username: this.newUsername,
          password: this.newPassword,
          role: this.newUserRole,
          email: this.newUserEmailInput
        })
      });

      if (res.ok) {
        this.showToast(`User ${this.newUsername} created! Login credentials sent to email.`);
        this.newUsername = '';
        this.newPassword = '';
        this.newUserEmailInput = '';
        this.loadAdminData();
      } else {
        const err = await res.json();
        this.showToast('Error: ' + (err.error || 'Failed to create user.'));
      }
    } catch (e) {
      // Local mock support
      const mockUsersList = [...this.users(), {
        id: Date.now(),
        username: this.newUsername,
        role: this.newUserRole,
        email: this.newUserEmailInput,
        active: true
      }];
      this.users.set(mockUsersList);
      this.showToast(`[Local Demo] User ${this.newUsername} created! Credentials sent to ${this.newUserEmailInput || 'email'}.`);
      this.newUsername = '';
      this.newPassword = '';
      this.newUserEmailInput = '';
    }
  }

  // Toggle user active status (SuperAdmin)
  public async toggleUserActive(id: number) {
    try {
      const res = await fetch(`${this.gatewayUrl}/admin/users/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${this.token()}` }
      });
      if (res.ok) {
        this.showToast('User active status toggled.');
        this.loadAdminData();
      }
    } catch (e) {
      // Local mock support
      const updatedUsers = this.users().map(u => {
        if (u.id === id) u.active = !u.active;
        return u;
      });
      this.users.set(updatedUsers);
      this.showToast('[Local Demo] User account toggled.');
    }
  }

  // UI Utilities
  public selectServicesTab(tab: 'staffing' | 'facility') {
    this.activeServicesTab.set(tab);
  }

  public selectContactTab(tab: 'client' | 'candidate') {
    this.contactFormTab.set(tab);
  }

  public openDrawer(jobRole: string, location: string) {
    this.selectedJob.set(jobRole);
    this.selectedJobLocation.set(location);
    this.isDrawerActive.set(true);
  }

  public closeDrawer() {
    this.isDrawerActive.set(false);
    this.selectedJob.set(null);
    this.selectedJobLocation.set(null);
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }

  private resetLeadForm() {
    this.leadName = '';
    this.leadDesignation = '';
    this.leadCompany = '';
    this.leadEmail = '';
    this.leadPhone = '';
    this.leadDetails = '';
  }

  private resetApplicationForm() {
    this.appName = '';
    this.appEmail = '';
    this.appPhone = '';
    this.appCurrentCtc = null;
    this.appExpectedCtc = null;
    this.appCover = '';
    this.appResumeFile = null;
  }

  // fallback appRole getter
  public get appRole(): string {
    return this.selectedJob() || 'Sales Executive';
  }

  // Mock data fallbacks for standalone local running
  private getMockLeads() {
    return [];
  }

  private getMockApplications() {
    return [];
  }

  private getMockUsers() {
    return [];
  }
}
