var api = require('./src/api.js').app;
const fs = require('fs');
const proteinsFilepath = './src/proteins.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/proteins', function (request, response) {
  response.json(getProteins());
});

api.get('/proteins/:id', function (request, response) {
  let protein = getProteinById(request.params.id);
  if (protein) response.json(protein);
  response.json('not found');
});

api.put('/proteins', function (request, response) {
  response.json(request.body);
  saveProtein(request.body);
  
});

api.post('/proteins', function (request, response) {
  let proteins = [];
  try {
    proteins = JSON.parse(fs.readFileSync(proteinsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var selprotein=getProteinById(request.body.id);
  if (selprotein != null) {
    var b=0;
    for(var i=0; i<proteins.length;i++){
      if(proteins[i].id==request.body.id) b=i;
    }
    proteins[b]=request.body;
  };
  try {
    fs.writeFileSync(proteinsFilepath, JSON.stringify(proteins));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }




  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('Protein was saved succesfully');
});

api.delete('/proteins/:index', function (request, response) {
  let proteins = [];
  try {
    proteins = JSON.parse(fs.readFileSync(proteinsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var b=0;
  for(var i=0; i<proteins.length;i++){
    if(proteins[i].id==request.params.index) b=i;
  }
  proteins.splice(b, 1);
  if (proteins==null) console.log();
  else{
  try {
    fs.writeFileSync(proteinsFilepath, JSON.stringify(proteins));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}
   response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getProteins() {
  let proteins = [];
  try {
    proteins = JSON.parse(fs.readFileSync(proteinsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return proteins;
}

function saveProtein(protein) {
  let proteins = getProteins();// citire json din fisier
  let maxId = getMaxId(proteins);
  protein.id = maxId+1;// generare id unic
  proteins.push(protein);// adaugare masina noua in array
  try {
    fs.writeFileSync(proteinsFilepath, JSON.stringify(proteins));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(proteins) {
  let max = 0;
  for (var i=0; i<proteins.length;i++) {
    if(max < proteins[i].id) {
      max = proteins[i].id;
    }
  }
  return max;
}

function getProteinById(id){
  let proteins = getProteins();// citire json din fisier
  let selectedProtein = null;
  for(var i=0; i<proteins.length; i++) {
    if(id == proteins[i].id) selectedProtein = proteins[i];
  }
  return selectedProtein;
}