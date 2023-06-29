
import { useEffect, useState } from 'react'
import corpo from './corpo.css'
import { Dados } from './dados'
import TabelaCarro from './TabelaCarro';
import Modal from 'react-modal'

Modal.setAppElement('#root');

export default function Corpo() {
    const [lista, setLista] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [observacoes, setObservacoes] = useState("")

    function abrirModal() {
        setOpenModal(true)
    }
    function fecharModal() {
        setOpenModal(false)
    }

    useEffect(() => {
        setLista(Dados)
    }, []);

    function Submitar(e) {
        e.preventDefault();
        localStorage.setItem('observacoes', observacoes);
      }

    useEffect(() => {
        const salvaObser = localStorage.getItem('observacoes')
        if (salvaObser) {
            setObservacoes(salvaObser)
        }
    }, []);



  

    const itemTabela = lista.map(lista => (
        <TabelaCarro key={lista.id} lista={lista} observacoes={observacoes} />
    ))

    return (
        <div className="corpo">
            <div className="exibirForm" style={{ cursor: 'pointer' }} onClick={abrirModal}> <h3>Exibir o formulário de avaliação</h3></div>
            <Modal
                isOpen={openModal}
                onRequestClose={fecharModal}
                className='modal'>
                <button onClick={fecharModal}>Fechar</button>

                <form onSubmit={Submitar}>
                    <label for="cars">Selecione o carro : </label>
                    <select>
                        {lista.map(carro => (
                            <option key={carro.id} value={carro.id}>{carro.nome}</option>
                        ))}
                    </select>


                    <div className="centraliza">
                        <h2>Sua propria opinião</h2>
                        <textarea name="" id="" cols="30" rows="10" value={observacoes} 
                        onChange={(e) => setObservacoes(e.target.value)} >Escreva aqui</textarea>

                        <div className="centra">
                            <input type="submit" value="Enviar" />
                        </div>

                    </div>
                </form>
                {/* Submitar */}


            </Modal>
            <div className="itemtabela" style={{
                marginTop: 15, marginRight: 5,
                display: 'flex', justifyContent: 'center'
            }}>{itemTabela}</div>



        </div>
    )
}