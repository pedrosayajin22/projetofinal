import { useEffect, useState } from 'react';
import corpo from './corpo.css';
import { Dados } from './dados';
import TabelaCarro from './TabelaCarro';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Corpo() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [carroSelecionado, setCarroSelecionado] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    setLista(Dados);
  }, []);

  useEffect(() => {
    const SalvaObr = localStorage.getItem(carroSelecionado);
    if (SalvaObr) {
      setObservacoes(SalvaObr);
    } else {
      setObservacoes('');
    }
  }, [carroSelecionado]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const MudancadoCarro = (e) => {
    setCarroSelecionado(e.target.value);
  };

  const Mensagem = (e) => {
    setObservacoes(e.target.value);
  };

  const Submit = (e) => {
    // essa funçao  procura no array um id que seja igual ao do carro selecionado, no caso o find procura
    
    e.preventDefault();
    const ProcuraCarro = { ...lista.find((carro) => carro.id === carroSelecionado), observacoes };
    const ProcuraLista  = lista.map((carro) => (carro.id === carroSelecionado ? ProcuraCarro : carro));
    setLista(ProcuraLista);
    localStorage.setItem(carroSelecionado, observacoes);
  };

  return (
    <div className="corpo">
      <div className="exibirForm" style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
        <h3>Exibir o formulário de avaliação</h3>
      </div>
      <Modal isOpen={openModal} onRequestClose={handleCloseModal} className='modal'>
        <button onClick={handleCloseModal}>Fechar</button>
       
        <form onSubmit={Submit}>
          <label htmlFor="cars">Selecione o carro:</label>
          <select value={carroSelecionado} onChange={MudancadoCarro}>
            <option value="">Selecione um carro</option>
            {lista.map((carro) => (
              <option key={carro.id} value={carro.id}>
                {carro.nome}
              </option>
            ))}
          </select>
          {carroSelecionado && (
            <div className="centraliza">
              <h2>Sua própria opinião</h2>
              <textarea cols="30" rows="10" value={observacoes} onChange={Mensagem}></textarea>
              <div className="centra">
                <input type="submit" value="Enviar" />
              </div>
            </div>
          )}
        </form>
      </Modal>
      <div className="itemtabela" style={{ marginTop: 15, marginRight: 5, display: 'flex', justifyContent: 'center' }}>
        {lista.map((carro) => (
          <TabelaCarro key={carro.id} lista={carro} observacoes={carro.id === carroSelecionado ? observacoes : localStorage.getItem(carro.id) || ''} />
        ))}
      </div>
    </div>
  );
}
