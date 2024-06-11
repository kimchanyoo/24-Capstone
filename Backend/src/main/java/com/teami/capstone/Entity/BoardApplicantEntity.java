package com.teami.capstone.Entity;

import com.teami.capstone.DTO.Request.Board.BoardApplicantRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="boardapplicant")
public class BoardApplicantEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;

	@Column(name="post_id")
	private int postId;

	@Column(name="user_id")
	private String userId;

	@Column(name="nickname")
	private String nickName;

	@Column(name="email")
	private String email;

	public BoardApplicantEntity(BoardApplicantRequestDto dto, String userId, String nickName, String email){
		this.postId = dto.getPostId();
		this.userId = userId;
		this.nickName = nickName;
		this.email = email;
	}
}
