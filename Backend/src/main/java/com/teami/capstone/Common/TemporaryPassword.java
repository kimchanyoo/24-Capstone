package com.teami.capstone.Common;

public class TemporaryPassword {
	public static String getTemporaryPassword(){
		StringBuilder temporaryPassword = new StringBuilder();
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
				'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
		'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
		'x', 'y', 'z'};

		int idx = 0;
		for (int i=0; i<10; i++) {
			idx = (int) (charSet.length * Math.random());
			temporaryPassword.append(charSet[idx]);
		}

		return temporaryPassword.toString();
	}
}
