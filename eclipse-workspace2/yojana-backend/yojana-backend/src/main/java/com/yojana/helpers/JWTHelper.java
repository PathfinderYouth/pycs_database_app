package com.yojana.helpers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JWTHelper {
	
	private Algorithm algorithm = Algorithm.HMAC512("secret");

	public String encrypt(String username) {
		String token = JWT.create().withClaim("employee", username).sign(algorithm);
		return token;
	}

	public String validate(String token) {
		DecodedJWT decoded = JWT.require(algorithm).acceptLeeway(10000).build().verify(token);
		return decoded.getClaim("employee").asString();
	}

}