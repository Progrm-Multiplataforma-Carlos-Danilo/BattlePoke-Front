import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import * as Animatable from 'react-native-animatable';

import { styles } from './style';
import { colors } from '../../../constants/colors';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: 'Team', icon: 'account-group', path: '/Home' },
    { name: 'Arena', icon: 'sword-cross', path: '/Battle' },
    { name: 'Pokedex', icon: 'tablet-dashboard', path: '/Pokedex' },
    { name: 'Profile', icon: 'account-outline', path: '/Profile' },
    
  ] as const;

  return (
    <Animatable.View 
      transition={"width"} 
      duration={300} 
      style={[styles.container, !isOpen && styles.containerClose]}
    >
      <View style={[styles.logoContainer, !isOpen && styles.logoContainerClose]}>
        {isOpen && (
          <Image source={require('../../../../assets/images/Logo.png') } style={styles.logo} />
        )}
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <MaterialCommunityIcons 
            name={isOpen ? 'chevron-left' : 'chevron-right'} 
            size={30} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
      </View>

      {Platform.OS === 'web' && (
        <View style={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname.includes(item.path);
            return (
              <TouchableOpacity 
                key={item.name}
                style={[styles.navItem, isActive && styles.activeNavItem, !isOpen && styles.navItemClose]}
                onPress={() => router.push(item.path as any)}
              >
                <MaterialCommunityIcons 
                  name={item.icon} 
                  size={20} 
                  color={isActive ? "#000" : colors.text.secondary} 
                />
              
                {isOpen && (
                  <Text style={[styles.navLink, isActive && styles.activeLink]}>{item.name}</Text>
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      )}

      <View style={styles.DownSection}>
        <TouchableOpacity style={[styles.OptionsButton, !isOpen && styles.navItemClose]}>
          {isOpen ? (
            <Text style={styles.OptionsButtonText}>Suporte</Text>
          ) : (
            <MaterialCommunityIcons name="help-circle-outline" size={24} color={colors.text.secondary} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.OptionsButton, !isOpen && styles.navItemClose]} onPress={() => router.replace('/')}>
          {isOpen ? (
            <Text style={styles.OptionsButtonText}>Exit</Text>
          ) : (
            <MaterialCommunityIcons name="logout" size={24} color={colors.text.secondary} />
          )}
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}
