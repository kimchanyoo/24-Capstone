package com.teami.capstone.Repository;

import com.teami.capstone.Entity.BoardApplicantEntity;
import com.teami.capstone.Repository.ResultSet.GetApplicantResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardApplicantRepository extends JpaRepository<BoardApplicantEntity, Integer> {

	@Query(
			value=
					"SELECT " +
							"b.post_id as postId, " +
							"b.nickname as nickname, " +
							"b.email as email " +
							"FROM boardapplicant b " +
							"WHERE post_id = ?1  ; ",
			nativeQuery = true
	)
	List<GetApplicantResultSet> getApplicants(Integer postId);

	@Query(
			value=
					"SELECT exists( " +
							"SELECT 1 FROM boardapplicant " +
							"WHERE post_id = ?1 AND user_id = ?2 ) ; ",
			nativeQuery = true
	)
	boolean existsApplicant(Integer postId, String userId);
}
