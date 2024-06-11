package com.teami.capstone.DTO.Object;

import com.teami.capstone.Repository.ResultSet.GetUploadListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UploadListItem {

	private Integer postId;
	private String title;

	public UploadListItem(GetUploadListResultSet uploadList){
		this.title = uploadList.getTitle();
		this.postId = uploadList.getPostId();
	}

	public static List<UploadListItem> getList(List<GetUploadListResultSet> getBoardListResultSetList){
		List<UploadListItem> list = new ArrayList<>();
		for(GetUploadListResultSet getBoardListResultSet : getBoardListResultSetList){
			UploadListItem boardListItem = new UploadListItem(getBoardListResultSet);
			list.add(boardListItem);
		}
		return list;
	}
}
