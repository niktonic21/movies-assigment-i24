import React from 'react';
import { Icon, useNavigate, getScaledValue } from 'renative';
import Theme, { themeStyles } from '../theme';

const SearchButton = props => {
    const navigate = useNavigate(props);
    return (
        <Icon
            iconFont="ionicons"
            iconName="ios-search"
            iconColor={Theme.color3}
            size={getScaledValue(30)}
            style={themeStyles.icon}
            onPress={() => {
                navigate('Search');
            }}
        />
    );
};

export default SearchButton;
