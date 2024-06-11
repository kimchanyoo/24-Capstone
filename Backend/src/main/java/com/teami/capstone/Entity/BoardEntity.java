package com.teami.capstone.Entity;

import com.teami.capstone.DTO.Request.Board.BoardCreateRequestDto;
import com.teami.capstone.DTO.Request.Board.PatchBoardRequestDto;
import com.teami.capstone.Filter.JwtAutenticationFilter;
import com.teami.capstone.Provider.JwtProvider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="board")
public class BoardEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="post_id")
	private Integer postId;

	@Column(name="user_id")
	private String userId;

	@Column(name="recruitmentclassification")
	private Integer recruitmentClassification;

	@Column(name="recruitmentperson")
	private Integer recruitmentPerson;

	@Column(name="processing")
	private Integer processing;

	@Column(name="processingduration")
	private Integer processingDuration;

	@Column(name="deadline")
	private LocalDate deadLine;

	@Column(name="title")
	private String title;

	@Column(name="body")
	private String body;

	@Column(name="termination")
	private Boolean termination;

	@Column(name="field")
	@ElementCollection
	@CollectionTable(name="boardfield", joinColumns = @JoinColumn(name="post_id"))
	private List<Integer> field;

	@Column(name="tech")
	@ElementCollection
	@CollectionTable(name="boardtech", joinColumns = @JoinColumn(name="post_id"))
	private List<Integer> tech;

	public BoardEntity(BoardCreateRequestDto dto){
		this.recruitmentClassification = dto.getRecruitmentClassification();
		this.recruitmentPerson = dto.getRecruitmentPerson();
		this.processing = dto.getProcessing();
		this.processingDuration = dto.getProcessingDuration();
		this.deadLine = dto.getDeadLine();
		this.title = dto.getTitle();
		this.body = dto.getBody();
		this.termination = false;
		this.field = dto.getField();
		this.tech = dto.getTech();
	}

	public void patchBoard(PatchBoardRequestDto dto){
		this.recruitmentClassification = dto.getRecruitmentClassification();
		this.recruitmentPerson = dto.getRecruitmentPerson();
		this.processing = dto.getProcessing();
		this.processingDuration = dto.getProcessingDuration();
		this.deadLine = dto.getDeadLine();
		this.title = dto.getTitle();
		this.body = dto.getBody();
	}

	public void expireBoard(){
		this.termination = true;
	}
}
