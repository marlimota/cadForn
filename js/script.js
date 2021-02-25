
var app = new function () {
  //A tabela onde serão mostrados os elementos(fornecedores)
  this.FornecedoresTable = document.getElementById('fornecedoresBody');

  function Fornecedor(nomeFantasia, razaoSocial, cnpj, telefone, celular, endereco, email, site, produto, contrato, observacao = "") {
    this.nomeFantasia = nomeFantasia;
    this.razaoSocial = razaoSocial;
    this.cnpj = cnpj;
    this.telefone = telefone;
    this.celular = celular;
    this.endereco = endereco;
    this.email = email;
    this.site = site;
    this.produto = produto;
    this.contrato = contrato;
    this.observacao = observacao;
  }

  this.fornecedoresList = [];


  this.FetchAll = function () {
    var data = '';

    if (this.fornecedoresList.length > 0) {
      for (i = 0; i < this.fornecedoresList.length; i++) {
        if (i % 2 == 0) {
          data += '<tr class="colored-row">';
        }
        else {
          data += '<tr>';
        }
        data += '<td style="width:9%">' + this.fornecedoresList[i].nomeFantasia + '</td>';
        data += '<td style="width:9%">' + this.fornecedoresList[i].razaoSocial + '</td>';
        data += '<td style="width:9%">' + this.fornecedoresList[i].cnpj + '</td>';
        data += '<td style="width:9%">' + this.fornecedoresList[i].telefone + '</td>';
        data += '<td style="width:9%"> <Button onclick="app.Details(' + i + ')"  class="btn" id="details-btn"><i class="fa fa-ellipsis-h"></i> Detalhes</Button> </td>';
        data += '<td style="width:9%"> <Button onclick="app.Edit(' + i + ')"  class="btn" id="edit-btn"><i class="fa fa-edit"></i> Editar</Button> </td>';
        data += '<td style="width:9%"> <button onclick="app.Delete(' + i + ')" class="btn-delete"><i class="fa fa-times"></i></button> </td>';
        data += '</tr>';
      }
    }
    return this.FornecedoresTable.innerHTML = data;
  };

  this.AddProvider = function () {
    let currentFornecedor = new Fornecedor(
      document.getElementById('nomeFantasia').value,
      document.getElementById('razaoSocial').value,
      document.getElementById('cnpj').value,
      document.getElementById('telefone').value,
      document.getElementById('celular').value,
      document.getElementById('endereco').value,
      document.getElementById('email').value,
      document.getElementById('site').value,
      document.getElementById('produto').value,
      document.getElementById('contrato').value,
      document.getElementById('observacao').value,
    );

    if (isFornecedorValid(currentFornecedor)) {
      // Add the new value
      this.fornecedoresList.push(currentFornecedor);

      // Reset input value
      document.getElementById('nomeFantasia').value = "";
      document.getElementById('razaoSocial').value = "";
      document.getElementById('cnpj').value = "";
      document.getElementById('telefone').value = "";
      document.getElementById('celular').value = "";
      document.getElementById('endereco').value = "";
      document.getElementById('email').value = "";
      document.getElementById('site').value = "";
      document.getElementById('produto').value = "";
      document.getElementById('contrato').value = "";
      document.getElementById('observacao').value = "";


      // Dislay the new list
      this.FetchAll();

      HideNewProviderOverlay();
    }
  };

  //Funçao de cadastrar
  this.ShowDetails = function (item) {

    //Cria um objeto fornecedor que é cópia do fornecedor que se deseja editar
    currentFornecedor = this.fornecedoresList[item];

    //Exibe as informações do fornecedor a ser editado nos campos de edição
    document.getElementById('nomeFantasia').value = currentFornecedor.nomeFantasia;
    document.getElementById('razaoSocial').value = currentFornecedor.razaoSocial;
    document.getElementById('cnpj').value = currentFornecedor.cnpj;
    document.getElementById('telefone').value = currentFornecedor.telefone;
    document.getElementById('celular').value = currentFornecedor.celular;
    document.getElementById('endereco').value = currentFornecedor.endereco;
    document.getElementById('email').value = currentFornecedor.email;
    document.getElementById('site').value = currentFornecedor.site;
    document.getElementById('produto').value = currentFornecedor.produto;
    document.getElementById('contrato').value = currentFornecedor.contrato;
    document.getElementById('observacao').value = currentFornecedor.observacao;

    //Exibe os campos de edição
    ShowNewProviderOverlay();
    self = this;
  };
  //funçao salvar
  this.SaveEditedFornecedor = function (item) {

    //Cria um objeto fornecedor com todas as informações contidas nos campos de edição
    let fornecedor = new Fornecedor(
      document.getElementById('nomeFantasia').value,
      document.getElementById('razaoSocial').value,
      document.getElementById('cnpj').value,
      document.getElementById('telefone').value,
      document.getElementById('celular').value,
      document.getElementById('endereco').value,
      document.getElementById('email').value,
      document.getElementById('site').value,
      document.getElementById('produto').value,
      document.getElementById('contrato').value,
      document.getElementById('observacao').value
    );

    //Caso todas as informações sejam válidas atualiza a lista de fornecedores e esconde os campos de edição
    if (isFornecedorValid(fornecedor)) {
      // Edit value
      this.fornecedoresList.splice(item, 1, fornecedor);
      // Display the new list
      this.FetchAll();
      // Hide fields
      HideNewProviderOverlay();
    }
  };

  //edit function

  this.Edit = function (item) {
    this.ShowOverlay(item);
    this.SetReadOnly(false);

    document.getElementById("newFornecedor").style.display = "none";
    document.getElementById("edit").style.display = "flex";
    document.getElementById("details").style.display = "none";
  }

  //DELETE FUNCTION
  this.Delete = function (item) {
    // Delete the current row
    this.fornecedoresList.splice(item, 1);
    // Display the new list
    this.FetchAll();
  };

  //DETAILS FUNCTION  

  this.Details = function (item) {
    this.ShowOverlay(item);
    this.SetReadOnly(true);
    document.getElementById("newFornecedor").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("details").style.display = "flex";
  }

  this.ShowOverlay = function (item) {
    document.getElementById("pageOverlay").style.display = "block";
    document.getElementById("nomeFantasia").value = this.fornecedoresList[item].nomeFantasia;
    document.getElementById("razaoSocial").value = this.fornecedoresList[item].razaoSocial;
    document.getElementById("cnpj").value = this.fornecedoresList[item].cnpj;
    document.getElementById("telefone").value = this.fornecedoresList[item].telefone;
    document.getElementById("celular").value = this.fornecedoresList[item].celular;
    document.getElementById("endereco").value = this.fornecedoresList[item].endereco;
    document.getElementById("email").value = this.fornecedoresList[item].email;
    document.getElementById("site").value = this.fornecedoresList[item].site;
    document.getElementById("produto").value = this.fornecedoresList[item].produto;
    document.getElementById("contrato").value = this.fornecedoresList[item].contrato;
    document.getElementById("observacao").value = this.fornecedoresList[item].observacao;
  }

  this.SetReadOnly = function (value) {
    document.getElementById("nomeFantasia").readOnly = value;
    document.getElementById("razaoSocial").readOnly = value;
    document.getElementById("cnpj").readOnly = value;
    document.getElementById("telefone").readOnly = value;
    document.getElementById("celular").readOnly = value;
    document.getElementById("endereco").readOnly = value;
    document.getElementById("email").readOnly = value;
    document.getElementById("site").readOnly = value;
    document.getElementById("produto").readOnly = value;
    document.getElementById("contrato").readOnly = value;
    document.getElementById("observacao").readOnly = value;
  }

  let initialProvider = new Fornecedor(
    "Marli",
    "Mota",
    "00.000.000/0000-00",
    "(00) 0000-0000",
    "(00) 00000-0000",
    "Rua das Ruas, 99 - São Paulo SP",
    "marli@mota.com",
    "www.marli.com.br",
    "Softwares",
    "000000000000001",
    ""
  );

  this.fornecedoresList.push(initialProvider);
};


app.FetchAll();

this.ShowNewProviderOverlay = function () {
  document.getElementById("pageOverlay").style.display = "block";
  document.getElementById("edit").style.display = "none";
  document.getElementById("details").style.display = "none";
  document.getElementById("newFornecedor").style.display = "flex";
}

this.HideNewProviderOverlay = function () {
  document.getElementById("pageOverlay").style.display = "none";
}

function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}


function isFornecedorValid(fornecedor) {
  if (fornecedor.nomeFantasia.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres!");
    return false;
  }
  if (fornecedor.razaoSocial.length < 3) {
    alert("A razão social deve ter pelo menos 3 caracteres!");
    return false;
  }

  if (fornecedor.cnpj.length < 14) {
    alert("O CNPJ deve ter pelo menos 14 caracteres!");
    return false;
  }

  if (fornecedor.endereco.length > 35) {
    alert("O endereço deve ter até 35 caracteres!");
    return false;
  }

  if (fornecedor.telefone === "") {
    alert("Você deve digitar um telefone válido!");
    return false;
  }

  if (fornecedor.produto === "") {
    alert("Você deve digitar um produto!");
    return false;
  }

  if (fornecedor.contrato.length < 10) {
    alert("Você deve digitar o número do contrato. O número possui 11 caracteres!");
    return false;
  }

  return true;

}