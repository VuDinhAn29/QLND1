package com.example.qlnd1.services;


import com.example.qlnd1.models.Role;
import com.example.qlnd1.repositories.Rolerepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final Rolerepository rolerepository;
    @Override
    public List<Role> getAllRoles() {
        return rolerepository.findAll() ;
    }
}
