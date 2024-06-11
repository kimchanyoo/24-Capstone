package com.teami.capstone.Repository;

import com.teami.capstone.Entity.UserEntity;
import com.teami.capstone.Repository.ResultSet.GetIdResultSet;
import com.teami.capstone.Repository.ResultSet.GetUserProfileResultSet;
import com.teami.capstone.Repository.ResultSet.GetUserResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
	boolean existsByUserId(String userId);

	UserEntity findByUserId(String userId);

	boolean existsByNickName(String nickName);

	@Query(
			value=
					"SELECT " +
							"nickname as nickname " +
							"FROM users " +
							"WHERE user_id = ?1 ; ",
			nativeQuery = true
	)
	String findNickName(String userId);

	@Query(
			value=
					"SELECT " +
							"email as email " +
							"FROM users " +
							"WHERE user_id = ?1 ; ",
			nativeQuery = true
	)
	String findEmail(String userId);

	@Query(
			value=
					"SELECT " +
							"nickname as nickname, " +
							"name as name, " +
							"user_id as userId, " +
							"phonenumber as phoneNumber, " +
							"email as email, " +
							"schoolname as schoolName, " +
							"department as department, " +
							"field as field, " +
							"career as career " +
							"FROM users " +
							"WHERE user_id = ?1  ; ",
			nativeQuery = true
	)
	GetUserProfileResultSet findUserProfile(String userId);

	@Query(
			value=
					"SELECT " +
							"nickname as nickname, " +
							"email as email, " +
							"schoolname as schoolName, " +
							"department as department, " +
							"field as field, " +
							"career as career " +
							"FROM users " +
							"WHERE nickname = ?1  ; ",
			nativeQuery = true
	)
	GetUserResultSet findUserByNickName(String nickName);

	@Transactional
	@Modifying
	@Query(
			value=
					"DELETE FROM users " +
							"WHERE user_id = ?1 ; ",
			nativeQuery = true
	)
	int delete(String userId);

	@Query(
			value=
					"SELECT exists( " +
							"SELECT 1 FROM users " +
							"WHERE name = ?1 AND email = ?2 ) ; ",
			nativeQuery = true
	)
	boolean existsByNameAndEmail(String name, String email);

	@Query(
			value=
					"SELECT " +
							"user_id as userId " +
							"FROM users " +
							"WHERE name = ?1 AND email = ?2 ; ",
			nativeQuery = true
	)
	GetIdResultSet findByNameAndEmail(String name, String email);

	@Query(
			value=
					"SELECT " +
							"pwd as pwd " +
							"FROM users " +
							"WHERE user_id = ?1 ; ",
			nativeQuery = true
	)
	String findPwd(String userId);

}
