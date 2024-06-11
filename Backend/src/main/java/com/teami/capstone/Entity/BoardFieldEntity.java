package com.teami.capstone.Entity;

import com.teami.capstone.DTO.Request.Board.BoardApplicantRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="boardfield")
public class BoardFieldEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;

	@Column(name="post_id")
	private Integer postId;

	@Column(name="field")
	private Integer field;

	public BoardFieldEntity(Integer postId, Integer field){
		this.postId = postId;
		this.field = field;
	}
}
