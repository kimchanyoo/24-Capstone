package com.teami.capstone.Entity;

import com.teami.capstone.DTO.Request.Auth.PatchPasswordRequestDto;
import com.teami.capstone.DTO.Request.Auth.SignUpRequestDto;
import com.teami.capstone.DTO.Request.User.PatchUserRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="users")
public class UserEntity {

	@Id
	@Column(name= "user_id")
	private String userId;

	@Column(name="nickname")
	private String nickName;

	@Column(name="name")
	private String name;

	@Column(name="pwd")
	private String pwd;

	@Column(name="phonenumber")
	private String phoneNumber;

	@Column(name="email")
	private String email;

	@Column(name="schoolname")
	private String schoolName;

	@Column(name="department")
	private String department;

	@Column(name="attendancestatus")
	private Integer attendanceStatus;

	@Column(name="role")
	private String role;

	@Column(name="field")
	private Integer field;

	@Column(name="career")
	private String career;

	@Column(name="tech")
	@ElementCollection
	@CollectionTable(name="usertech", joinColumns = @JoinColumn(name="user_id"))
	private List<Integer> tech;

	public UserEntity(SignUpRequestDto dto){
		this.userId = dto.getUserId();
		this.nickName = dto.getNickName();
		this.name = dto.getName();
		this.pwd = dto.getPwd();
		this.phoneNumber = dto.getPhoneNumber();
		this.email = dto.getEmail();
		this.schoolName = dto.getSchoolName();
		this.department = dto.getDepartment();
		this.attendanceStatus = dto.getAttendanceStatus();
		this.field = dto.getField();
		this.career = dto.getCareer();
		this.role = "ROLE_USER";
		this.tech = dto.getTech();
	}

	public void patchUser(PatchUserRequestDto dto){
		this.nickName = dto.getNickName();
		this.phoneNumber = dto.getPhoneNumber();
		this.field = dto.getField();
		this.career = dto.getCareer();
		this.tech = dto.getTech();
	}

	public void patchPassword(String pwd){
		this.pwd = pwd;
	}
}
