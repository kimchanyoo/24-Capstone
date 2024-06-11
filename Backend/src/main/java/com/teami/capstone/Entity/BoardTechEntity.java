package com.teami.capstone.Entity;

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
@Table(name="boardtech")
public class BoardTechEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;

	@Column(name="post_id")
	private Integer postId;

	@Column(name="tech")
	private Integer tech;

	public BoardTechEntity(Integer postId, Integer tech){
		this.postId = postId;
		this.tech = tech;
	}
}
