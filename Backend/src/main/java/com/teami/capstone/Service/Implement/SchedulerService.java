package com.teami.capstone.Service.Implement;

import com.teami.capstone.Entity.BoardEntity;
import com.teami.capstone.Repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SchedulerService {

	private final BoardRepository boardRepository;

	@Transactional
	@Async
	@Scheduled(cron = "0 0 0 * * *")
	public void autoExpire(){

		List<BoardEntity> boardEntityList = new ArrayList<>();

		boardEntityList = boardRepository.getBoards();

		for(BoardEntity boardEntity : boardEntityList){
			boolean difference = boardEntity.getDeadLine().isBefore(LocalDate.now());

			if(difference){
				boardEntity.setTermination(Boolean.TRUE);
				boardRepository.save(boardEntity);
			}
		}
	}

}
