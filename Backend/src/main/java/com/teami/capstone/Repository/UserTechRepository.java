package com.teami.capstone.Repository;

import com.teami.capstone.Entity.UserTechEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserTechRepository extends JpaRepository<UserTechEntity, String> {

	@Query(
			value=
					"SELECT " +
							"b.tech as field " +
							"FROM usertech b " +
							"WHERE user_id = ?1 ; ",
			nativeQuery = true
	)
	List<Integer> findByUserId(@Param("user_id")String userId);

	@Query(
			value=
					"SELECT " +
							"b.tech as field " +
							"FROM usertech b " +
							"WHERE user_id = (SELECT user_id from users where nickname = ?1 ) ; ",
			nativeQuery = true
	)
	List<Integer> findByNickName(String nickName);

	@Transactional
	@Modifying
	@Query(
			value=
					"DELETE FROM usertech " +
							"WHERE user_id = ?1 ; ",
			nativeQuery = true
	)
	int deleteByUserId(String userId);

}
