package com.teami.capstone.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="usertech")
public class UserTechEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;

	@Column(name="user_id")
	private String userId;

	@Column(name="tech")
	private Integer tech;

	public UserTechEntity(String userId, Integer tech){
		this.userId = userId;
		this.tech = tech;
	}
}
