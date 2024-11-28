import React, { useEffect, useState } from "react";
import styles from "./servicos.module.css"; // Você pode criar um arquivo CSS com o nomeSrvc servico.module.css para estilos

// Função principal
export default function Servico() {
  const [servico, setServico] = useState([]);
  const [newServico, setNewServico] = useState({
    nomeSrvc: "",
    preco: "",
    tempo: "",
  });

  // Carrega serviços ao montar o componente
  useEffect(() => {
    const fetchServico = async () => {
      try {
        const response = await fetch("http://localhost:8080/servico");
        const data = await response.json();
        setServico(data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };

    fetchServico();
  }, []); // Array de dependências vazio para rodar apenas uma vez

  // Função para adicionar serviço (POST)
  const addServico = async () => {
    try {
      const response = await fetch("http://localhost:8080/servico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeSrvc: newServico.nomeSrvc || "Novo Serviço", // NomeSrvc padrão
          preco: newServico.preco || 0.0,
          tempo: newServico.tempo || "1 hora",
        }),
      });
      const newService = await response.json();
      setServico((prevServico) => [...prevServico, newService]);
      setNewServico({ nomeSrvc: "", preco: "", tempo: "" }); // Limpar os campos após adicionar
    } catch (error) {
      console.error("Erro ao adicionar serviço:", error);
    }
  };

  // Função para atualizar serviço (PUT)
  const updateServico = async (id, updatedServico) => {
    try {
      await fetch(`http://localhost:8080/servico/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedServico),
      });
      setServico((prevServico) =>
        prevServico.map((servico) =>
          servico.id === id ? { ...servico, ...updatedServico } : servico
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
    }
  };

  // Função para deletar serviço (DELETE)
  const deleteServico = async (id) => {
    try {
      await fetch(`http://localhost:8080/servico/${id}`, {
        method: "DELETE",
      });
      setServico((prevServico) => prevServico.filter((servico) => servico.id !== id));
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Serviços</h1>

      {/* Formulário para adicionar novo serviço */}
      <div className= {styles.box}>
        <input className={ styles.input }
            type="text"
            placeholder="Nome do Serviço"
            value={newServico.nomeSrvc}
            onChange={(e) => setNewServico({ ...newServico, nomeSrvc: e.target.value })}
        />
        <input className={ styles.input }
            type="text"
            placeholder="Preço"
            value={newServico.preco}
            onChange={(e) => setNewServico({ ...newServico, preco: e.target.value })}
        />
        <input className={ styles.input }
            type="text"
            placeholder="Tempo"
            value={newServico.tempo}
            onChange={(e) => setNewServico({ ...newServico, tempo: e.target.value })}
        />
        <button className={ styles.button} onClick={addServico}>Adicionar Serviço</button>
      </div>

      <h2>Lista de Serviços</h2>
      <ul>
        {servico.map((servico) => (
          <li className={styles.listItem} key={servico.id}>
            <input className={ styles.lista }
              type="text"
              defaultValue={servico.nomeSrvc}
              onBlur={(e) => updateServico(servico.id, { nomeSrvc: e.target.value })}
            />
            <input className={ styles.lista }
              type="text"
              defaultValue={servico.preco}
              onBlur={(e) => updateServico(servico.id, { preco: e.target.value })}
            />
            <input className={ styles.lista }
              type="text"
              defaultValue={servico.tempo}
              onBlur={(e) => updateServico(servico.id, { tempo: e.target.value })}
            />
            <button className={styles.send} onClick={() => deleteServico(servico.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
