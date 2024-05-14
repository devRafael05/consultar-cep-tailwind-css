document.getElementById('cepForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const cep = document.getElementById('cepInput').value;

  if (cep == ''){
    document.getElementById('cepResult').innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Erro ao buscar o CEP. Você precisa digitar um CEP.</div>`
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
          if (data.erro) {
              document.getElementById('cepResult').innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">CEP não encontrado.</div> `;
          } else {
              document.getElementById('cepResult').innerHTML = `
                  <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                      <p><strong>CEP:</strong> ${data.cep}</p>
                      <p><strong>Rua:</strong> ${data.logradouro}</p>
                      <p><strong>Bairro:</strong> ${data.bairro}</p>
                      <p><strong>Cidade:</strong> ${data.localidade}</p>
                      <p><strong>Estado:</strong> ${data.uf}</p>
                      <p class="text-xs mt-4">Consulta ultilizando a <a href="https://viacep.com.br/">API ViaCep</a></p>
                  </div>
              `;
          }
      })
      .catch(error => {
          document.getElementById('cepResult').innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Erro ao buscar o CEP. Tente novamente mais tarde.</div>`;
      });
});
