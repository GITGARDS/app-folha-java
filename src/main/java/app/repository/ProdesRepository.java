package app.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.entity.Prodes;

@Repository
public interface ProdesRepository extends JpaRepository<Prodes, Long> {
	
	Page<Prodes> findByDescricaoContaining(String descricao, Pageable pageable);

}
