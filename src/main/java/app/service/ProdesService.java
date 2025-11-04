package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import app.entity.Prodes;
import app.repository.ProdesRepository;

@Service
public class ProdesService {

	@Autowired
	private ProdesRepository prodesRepository;

	public Prodes create(Prodes data) {
		return this.prodesRepository.save(data);
	}

	public List<Prodes> create(List<Prodes> data) {
		return this.prodesRepository.saveAll(data);
	}

	public Prodes editById(long id, Prodes data) {
		Prodes regEdit = data;
		regEdit.setId(id);
		return this.prodesRepository.save(regEdit);
	}

	public String deleteById(long id) {
		this.prodesRepository.deleteById(id);
		return "Registro excluido com sucesso!";
	}

	public Prodes findById(long id) {
		return this.prodesRepository.findById(id).get();
	}

	public List<Prodes> findAll() {
		return this.prodesRepository.findAll();
	}

	public Page<Prodes> findAll(Pageable pageable) {
		return this.prodesRepository.findAll(pageable);
	}
	
	public Page<Prodes> findAll(String filter, Pageable pageable) {
		return this.prodesRepository.findByDescricaoContaining(filter, pageable);
	}

}
