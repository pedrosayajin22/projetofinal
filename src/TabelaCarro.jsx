import tabelacarro from './tabelacarro.css'
import React from 'react';
// Importa a modal do react-modal
import Modal from 'react-modal';

Modal.setAppElement('#root');
export default function TabelaCarro(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // Função que abre a modal
  function abrirModal() {
    setIsOpen(true);
  }

  // Função que fecha a modal
  function fecharModal() {
    setIsOpen(false);
  }



  return (
    <div className="tabela">
      <img src={props.lista.foto} alt="foto do carro" width={470} height={470} style={{ marginRight: 20 }} />
      <div className="carac" style={{ display: 'flex', justifyContent: "center" }}>
        <h3>Nome:{props.lista.nome}</h3>
        <h3 style={{ marginRight: 10, marginLeft: 10 }}>Marca:{props.lista.marca}</h3>
        <h3>Nome:{props.lista.ano}</h3>
      </div>
      <button className="button" onClick={abrirModal}>Ver Avaliação</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        className='modal'
      >
        <button onClick={fecharModal}>Fechar</button>
        <div className="modal-texto">
          <h2><span>Nome: </span> {props.lista.nome}</h2>
          <h3><span>Preço: </span> {props.lista.preco}</h3>
          <h3><span>Desempenho : </span>{props.lista.desempenho}</h3>
          <h3><span>Opinião Geral:</span> {props.lista.opiniao}</h3>
          <h3>Opinião Pessoal </h3>
          <h5>{props.observacoes}</h5>

        </div>

      </Modal>
    </div>
  )
}
