package com.teami.capstone.Common;

public class CertificationNumber {
	public static String getCertificationNumber(){
		StringBuilder certificationNumber = new StringBuilder();

		for(int count = 0; count < 6; count++){
			certificationNumber.append((int) (Math.random() * 10));
		}

		return certificationNumber.toString();
	}
}
