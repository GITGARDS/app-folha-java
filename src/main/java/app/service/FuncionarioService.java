package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import app.entity.Funcionario;
import app.repository.FuncionarioRepository;

@Service
public class FuncionarioService {

	@Autowired
	private FuncionarioRepository funcionarioRepository;

	public Funcionario create(Funcionario funcionario) {
		return this.funcionarioRepository.save(funcionario);
	}

	public List<Funcionario> create(List<Funcionario> funcionarios) {
		return this.funcionarioRepository.saveAll(funcionarios);
	}

	public Funcionario editById(long id, Funcionario funcionario) {
		Funcionario regEdit = funcionario;
		regEdit.setId(id);
		return this.funcionarioRepository.save(regEdit);
	}

	public String deleteById(long id) {
		this.funcionarioRepository.deleteById(id);
		return "Registro excluido com sucesso!";
	}

	public Funcionario findById(long id) {
		return this.funcionarioRepository.findById(id).get();
	}

	public List<Funcionario> findAll() {
		return this.funcionarioRepository.findAll();
	}

	public Page<Funcionario> findAll(Pageable pageable) {
		return this.funcionarioRepository.findAll(pageable);
	}
	
	public Page<Funcionario> findAll(String nome, Pageable pageable) {
		return this.funcionarioRepository.findByNomeContaining(nome, pageable);
	}

}
