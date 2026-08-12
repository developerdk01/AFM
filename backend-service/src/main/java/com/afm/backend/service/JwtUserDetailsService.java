package com.afm.backend.service;

import com.afm.backend.entity.User;
import com.afm.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initDefaultUsers() {
        // Automatically seed a default SuperAdmin if the database is empty
        if (userRepository.count() == 0) {
            User superAdmin = new User();
            superAdmin.setUsername("superadmin");
            superAdmin.setPasswordHash(passwordEncoder.encode("superpassword"));
            superAdmin.setRole("ROLE_SUPERADMIN");
            superAdmin.setActive(true);
            userRepository.save(superAdmin);
            
            // Seed a default HR user for convenience
            User defaultHr = new User();
            defaultHr.setUsername("hruser");
            defaultHr.setPasswordHash(passwordEncoder.encode("hrpassword"));
            defaultHr.setRole("ROLE_HR");
            defaultHr.setActive(true);
            userRepository.save(defaultHr);

            // Seed a default Admin user
            User defaultAdmin = new User();
            defaultAdmin.setUsername("adminuser");
            defaultAdmin.setPasswordHash(passwordEncoder.encode("adminpassword"));
            defaultAdmin.setRole("ROLE_ADMIN");
            defaultAdmin.setActive(true);
            userRepository.save(defaultAdmin);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (!userOpt.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        User user = userOpt.get();
        if (!user.isActive()) {
            throw new UsernameNotFoundException("User account is inactive: " + username);
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}
