### ⚡ Autenticação com Google no Expo (React Native)

**Siga as instruções:**

* Inicialmente, você deve habilitar o gerenciador de credenciais de acordo com o seu aparelho (estou usando android)   
    * ```expo credentials:manager -p android```
    * Escolha as opções: YES -> update upload keystore -> generate new keystore -> quit credential manager.

* Use o seguinte comando para buscar a senha para gerar as chaves da keystore:  
    * ```expo fetch:android:keystore```
    * Salve o endereço onde a keystore foi gerada ("Saving keystore to ...");
    * Salve a senha "Keystore password".

* Use os seguintes comandos para obter a assinatura SHA-1 que será usada para criar as credenciais do google:   
    * ```keytool -genkeypair -keystore xyzkeystore -alias tomcat -keyalg RSA```
    * ```keytool -keystore C:\Users\55639\WebstormProjects\lettura\lettura.jks -list -v```
    * Salve o valor da variável Fingerprints do certificado -> SHA1.
    
* Vá para o [Google Developers Console](https://console.developers.google.com/);    

* No lado esquerdo da tela, clique em "Tela de Consentimento OAuth";
    * Preencha os dados do seu aplicativo, não se preocupando com os que não tem ainda (domínio e afins);
    * Atente para escolher o tipo de usuário como **EXTERNO**.

* Após criada a tela de consentimento, vá em "Credenciais", clique em "+ Criar Credenciais" -> "ID do cliente OAuth";

* Escolha o tipo de aplicativo (Android, no meu caso);

* O segredo para a biblioteca ```expo-google-app-auth``` funcionar, é colocar "host.exp.exponent" no campo "Nome do pacote";

* No campo "Impressão digital para certificação SHA-1", cole o valor da da chave que foi buscado lá no início (Fingerprints do certificado -> SHA1);

* Clique em "CRIAR";

* Instale a biblioteca ```expo-google-app-auth``` no seu app com o comando ```expo install expo-google-app-auth```

* Copie o código do meu ```App.tsx```;

* Informe a credenciar que foi gerada no Google Developers Console na linha 13, no campo ```androidClientId``` (se for IOS, troque por ```iosClientId```);

* Feito isso, rode o comando ```expo start``` para iniciar o aplicativo, faça o login e veja o resultado no console do Expo.

**FIM**

