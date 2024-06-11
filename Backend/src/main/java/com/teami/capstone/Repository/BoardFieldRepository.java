package com.teami.capstone.Repository;

import com.teami.capstone.Entity.BoardFieldEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BoardFieldRepository extends JpaRepository<BoardFieldEntity, Integer> {
	@Query(
			value=
			"SELECT " +
			"b.field as field " +
			"FROM boardfield b " +
			"WHERE post_id = ?1 ; ",
			nativeQuery = true
	)
	List<Integer> findByPostId(@Param("post_id")Integer postId);

	@Transactional
	@Modifying
	@Query(
			value=
					"DELETE FROM boardfield " +
							"WHERE post_id = ?1 ; ",
			nativeQuery = true
	)
	int deleteByPostId(Integer postId);
}
