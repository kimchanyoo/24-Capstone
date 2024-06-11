package com.teami.capstone.DTO.Object;

import com.teami.capstone.Repository.ResultSet.GetBoardListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {

	private Integer postId;
	private String nickName;
	private Integer recruitmentClassification;
	private Integer recruitmentPerson;
	private LocalDate deadLine;
	private String title;
	private boolean termination;


	public BoardListItem(GetBoardListResultSet getBoardListResultSet){
		this.postId = getBoardListResultSet.getPostId();
		this.nickName = getBoardListResultSet.getNickName();
		this.recruitmentClassification = getBoardListResultSet.getRecruitmentClassification();
		this.recruitmentPerson = getBoardListResultSet.getRecruitmentPerson();
		this.deadLine = getBoardListResultSet.getDeadLine();
		this.title = getBoardListResultSet.getTitle();
		this.termination = getBoardListResultSet.getTermination();
	}

	public static List<BoardListItem> getList(List<GetBoardListResultSet> getBoardListResultSetList){
		List<BoardListItem> list = new ArrayList<>();
		for(GetBoardListResultSet getBoardListResultSet : getBoardListResultSetList){
			BoardListItem boardListItem = new BoardListItem(getBoardListResultSet);
			list.add(boardListItem);
		}
		return list;
	}
}
