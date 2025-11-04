package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import app.entity.Empresa;
import app.repository.EmpresaRepository;

@Service
public class EmpresaService {

	@Autowired
	private EmpresaRepository empresaRepository;

	public Empresa create(Empresa data) {
		return this.empresaRepository.save(data);
	}

	public List<Empresa> create(List<Empresa> data) {
		return this.empresaRepository.saveAll(data);
	}

	public Empresa editById(long id, Empresa data) {
		Empresa regEdit = data;
		regEdit.setId(id);
		return this.empresaRepository.save(regEdit);
	}

	public String deleteById(long id) {
		this.empresaRepository.deleteById(id);
		return "Registro excluido com sucesso!";
	}

	public Empresa findById(long id) {
		return this.empresaRepository.findById(id).get();
	}

	public List<Empresa> findAll() {
		return this.empresaRepository.findAll();
	}

	public Page<Empresa> findAll(Pageable pageable) {
		return this.empresaRepository.findAll(pageable);
	}

	public Page<Empresa> findAll(String filter, Pageable pageable) {
		return this.empresaRepository.findByRazaoSocialContaining(filter, pageable);
	}

}
