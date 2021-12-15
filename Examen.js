let btnCargar=document.getElementById('btncargar');
btnCargar.addEventListener('click',()=>
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) =>
            {
                let select=document.getElementById("Seleccion");
                console.log(json);
                let lista="";
                for(let i=0;i<json.length;i++)
                    {
                        lista+="<option value='"+json[i].id+"'>" + json[i].name + "</option>";
                        select.innerHTML=lista;
                    }
            });
    });

let Select=document.getElementById("Seleccion");
    Select.addEventListener('change',()=>
        {
            let userId=document.getElementById("Seleccion").value;
            fetch('https://jsonplaceholder.typicode.com/users?userId=' + userId)
            .then((response)=> response.json())
            .then((json)=> 
                {
                    console.log(json)
                    let div1=document.getElementById("informacion");
                    let informacion="";
                    informacion=`
                                    <br>
                                    <button class="data" type="button" id="datosusuario" onclick="CargarDatos(${userId})" >VER INFORMACION</button>
                                    <button class="data" type="button" id="Albumfotos" onclick="CargarAlbum(${userId})" >CONSULTAR ALBUM</button>
                                    <br><br>
                                    <div id="datos"></div>
                                `;
                    div1.innerHTML="";
                    div1.innerHTML=informacion;
                });
        });

let CargarDatos = (UserId) =>
    {
        let Usuario=document.getElementById('datos');
        Usuario.innerHTML="";
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) =>
            {
                let Info="";
                for(let i=0;i<json.length;i++)
                    {
                        if(json[i].id===UserId)
                            {
                                Info=`
                                        <form>
                                            <fieldset>
                                                <Legend><a>Informacion</a></Legend>
                                                    <div id="idcomm${json[i].id}">
                                                    <h2> Username: ${json[i].username} </h2>
                                                    <h3> Street: ${json[i].address.street} </h3>
                                                    <h3> Suite: ${json[i].address.suite} </h3>
                                                    <h4> City: ${json[i].address.city} </h4>
                                                    <h4> Zipcode: ${json[i].address.zipcode} </h4>
                                                    <h4> Phone: ${json[i].phone} </h4>
                                            </fieldset>
                                            <br>
                                            <div class="cerrar">
                                            <button class="danger" type="button" onclick="CerrarInfo()">CERRAR</button>
                                            </div>
                                        </Form>
                                        
                                    `;
                            }
                    }
                    Usuario.innerHTML=Info;
            });
    };

let CerrarInfo = () =>
    {
        let Data=document.getElementById('datos');
        Data.innerHTML="";
    };

let CargarAlbum = (UserId) =>
    {
        let Usuario=document.getElementById('datos');
        Usuario.innerHTML="";
        let Titulos="";
        fetch('https://jsonplaceholder.typicode.com/albums?userId=' + UserId)
        .then((response)=> response.json())
        .then((json)=> 
            {
                console.log(json)
                for(let i=0;i<json.length;i++)
                    {
                        Titulos+=`
                                    <div id="album${json[i].userId}">
                                        <h3>${json[i].title}</h3>
                                    </div>
                                    <br>
                                    <button class="Fotos" type="button" id="btnVerfotos" onclick="CargarFotos(${json[i].id})">VER FOTOS</button>
                                    <br>
                                    <div id="Photos${json[i].id}"></div>
                                `;
                            Usuario.innerHTML=Titulos;
                    }
            });
    };

let CargarFotos = (AlbumId) =>
    {
        let Usuario=document.getElementById('datos');
        let user=document.getElementById('Seleccion').value;
        Usuario.innerHTML="";
        let Fotos='<br>' + '<button class="Regresar" type="button" id="Albumfotos" onclick="CargarAlbum(' + user +')">Regresar al Album</button>';

        fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + AlbumId)
        .then((response)=> response.json())
        .then((json)=> 
            {
                console.log(json)
                for(let i=0;i<json.length;i++)
                    {
 
                        Fotos+=`
                                <div class="post${json[i].albumId}">
                                    <h4>Foto ${json[i].id}: ${json[i].url}
                                </div>
                                <br>
                                `;
                        Usuario.innerHTML=Fotos;
                    }
            });
    };