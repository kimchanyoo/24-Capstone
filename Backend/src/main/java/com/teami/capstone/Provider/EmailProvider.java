package com.teami.capstone.Provider;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailProvider {

	private final JavaMailSender javaMailSender;

	private final String CERTIFICATIONSUBJECT = "[Teami 서비스] 인증 메일입니다.";
	private final String PASSWORDSUBJECT = "[Teami 서비스] 임시 비밀번호 발급입니다.";

	public boolean sendCertificationMail(String email, String certificationNumber){
		try{
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message,true);

			String htmlContent =getCertificationMessage(certificationNumber);

			messageHelper.setTo(email);
			messageHelper.setSubject(CERTIFICATIONSUBJECT);
			messageHelper.setText(htmlContent, true);

			javaMailSender.send(message);
		}catch (Exception exception){
			exception.printStackTrace();
			return false;
		}

		return true;
	}

	public boolean sendTemporaryPassword(String email, String temporaryPassword){
		try{
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message,true);

			String htmlContent =getTemporaryPassword(temporaryPassword);

			messageHelper.setTo(email);
			messageHelper.setSubject(PASSWORDSUBJECT);
			messageHelper.setText(htmlContent, true);

			javaMailSender.send(message);

		}catch (Exception exception){
			exception.printStackTrace();
			return false;
		}

		return true;
	}

	private String getCertificationMessage(String certificationNumber){
		String certificationMessage = "";
		certificationMessage += "<h1 style='text-align: center;'> [Teami 서비스] 인증메일</h1>";
		certificationMessage += "<h3 style='text-align: center;'>인증코드 : <strong style='font-size: 32px; letter-spacing: 8px;'>"
				+ certificationNumber + "</strong></h3>";
		return certificationMessage;
	}

	private String getTemporaryPassword(String temporaryPassword){
		String temporaryPasswordMessage = "";
		temporaryPasswordMessage += "<h1 style='text-align: center;'> [Teami 서비스] 임시 비밀번호</h1>";
		temporaryPasswordMessage += "<h3 style='text-align: center;'>임시 비밀번호 : <strong style='font-size: 32px; letter-spacing: 8px;'>"
				+ temporaryPassword + "</strong></h3>";
		return temporaryPasswordMessage;
	}
}
