package com.example.qlnd1.services;

import com.example.qlnd1.dtos.UpdateUserDTO;
import com.example.qlnd1.dtos.UserDTO;
import com.example.qlnd1.exceptions.DataNotFoundException;
import com.example.qlnd1.models.User;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;

    String login(String phoneNumber, String password) throws Exception ;
    User getUserDetailsFromToken(String token) throws Exception;

    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;

    User deleteUser(Long userId) throws Exception;

}
