package com.rahul.productsbackend.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.rahul.productsbackend.serviceimpl.UserDetailsServiceImpl;


@Service
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String requestTokenHeader = request.getHeader("Authorization");
		String username = null;
		String jwtToken = null;

		System.out.println("Hi i am in the fileter");
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			try {
				username = this.jwtUtil.extractUsername(jwtToken);
				System.out.println(username);
			} catch (Exception e) {
				e.printStackTrace();
			}

			UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(username);
			if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null,userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			} else {
				System.out.println("Token not validate ");
			}
		}
		filterChain.doFilter(request, response);
	}
}
