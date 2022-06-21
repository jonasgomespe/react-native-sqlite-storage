/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Text, View, Button} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase(
  {
    location: 'default',
    name: 'sqliteDb',
  },
  () => {
    console.log('Tudo certo');
  },
  () => {
    console.log('Errado');
  },
);

const App = () => {
  const [dadosBanco, setDadosBanco] = useState<any[]>([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS usuario (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password INTEGER)',
        [],
      );
    });
  }, []);

  const inserindoValor: any = () => {
    for (let i = 0; i < 4; i++) {
      const name: string = 'Usuario ' + i;
      const password: string = 'Senha ' + i;
      db.transaction(vl => {
        vl.executeSql(
          'INSERT INTO usuario ( name, password ) VALUES (?, ?)',
          [name, password],
          () => {
            console.log('Sucesso ao inserir');
          },
        );
      });
    }
  };

  const lerValor: any = () => {
    db.transaction(vl => {
      vl.executeSql('SELECT * FROM usuario', [], (req, result) => {
        var dadosBancos: any[] = [];
        for (let i = 0; i < result.rows.length; i++) {
          dadosBancos.push(result.rows.item(i));
        }

        setDadosBanco(dadosBancos);
      });
    });
  };

  return (
    <View>
      <Button title="Inserir" onPress={inserindoValor} />
      <Text></Text>
      <Button title="Ler" onPress={lerValor} />
      {dadosBanco.map(val => {
        return (
          <Text key={val.ID}>
            {val.name} - {val.password}
          </Text>
        );
      })}
    </View>
  );
};

export default App;
