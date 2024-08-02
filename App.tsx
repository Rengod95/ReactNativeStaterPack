import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ExchangeRateCrawlingService, ExchangeSymbol} from './src/Services/inbound/exchangeRateCrawling/adapter.ts';
import {Dropdown} from 'react-native-element-dropdown';
import {LabelValue} from './src/Services/domain/sharedKernel.ts';

const DeviceHeightRatio = Dimensions.get('window').height;
const DeviceWidthRatio = Dimensions.get('window').width;

function App(): React.JSX.Element {
  const [symbols, setSymbols] = useState<LabelValue<ExchangeSymbol>[]>([]);
  const [selectedFromSymbol, setSelectedFromSymbol] = useState<ExchangeSymbol>('');
  const [selectedTargetSymbol, setSelectedTargetSymbol] = useState<ExchangeSymbol>('');

  useEffect(() => {
    const rates = ExchangeRateCrawlingService.fetchExchangeRates().then(res => {
      return res;
    });

    rates.then(res => {
      const parsed = ExchangeRateCrawlingService.extractSymbol(res).map(symbol => {
        return {label: symbol, value: symbol};
      });
      setSymbols(parsed);
    });
  }, []);

  const renderItem = (item: LabelValue<string>) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === selectedFromSymbol && <Text style={{...styles.selectedTextStyle}}> Selected</Text>}
      </View>
    );
  };

  return (
    <View style={{height: DeviceHeightRatio, width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 14}}>app</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchField={'label'}
        placeholder="Select item"
        searchPlaceholder="Search..."
        data={symbols}
        value={selectedFromSymbol}
        onChange={item => {
          setSelectedFromSymbol(item.label);
        }}
        renderItem={renderItem}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
