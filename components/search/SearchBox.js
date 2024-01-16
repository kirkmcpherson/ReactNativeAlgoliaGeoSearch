import React, { useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useSearchBox } from 'react-instantsearch-core';

export function SearchBox({...props}) {
    const { query, refine } = useSearchBox({...props});
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef(null);

    function setQuery(newQuery) {
        setInputValue(newQuery);
        refine(newQuery);
    }

    // Track when the InstantSearch query changes to synchronize it with
    // the React state.
    // We bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (query !== inputValue && !inputRef.current?.isFocused()) {
        setInputValue(query);
    }

    return (
        <View style={styles.container}>
          <TextInput
            placeholder="Search place by name..."
            ref={inputRef}
            style={styles.input}
            value={inputValue}
            onChangeText={setQuery}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
          />
        </View>
    );   
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
      },
      input: {
        flex:5,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
      }      
});