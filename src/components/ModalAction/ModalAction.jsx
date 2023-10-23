import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ModalAdicionar.scss";

export default function ModalAdicionar({ open, onClose }) {
  const [formData, setFormData] = useState({
    nome: '',
    desc: '',
    preco: 0,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAdicionar = () => {
    fetch('http://localhost:5000/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao adicionar o produto');
      }
      console.log(response.status);
      alert('Produto Adicionado com sucesso');
      onClose();
      navigate("/produtos");
    })
    .catch(error => console.error(error));
  };

  if (!open) return null;

  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h2>Adicionar Produto</h2>
        <input type="text" name="nome" placeholder="Nome" onChange={handleInputChange} />
        <input type="text" name="desc" placeholder="Descrição" onChange={handleInputChange} />
        <input type="number" name="preco" placeholder="Preço" onChange={handleInputChange} />
        <button onClick={handleAdicionar}>Adicionar Produto</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
