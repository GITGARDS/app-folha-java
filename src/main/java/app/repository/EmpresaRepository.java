package app.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.entity.Empresa;


@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
	
	Page<Empresa> findByRazaoSocialContaining(String razaoSocial, Pageable pageable);

}
