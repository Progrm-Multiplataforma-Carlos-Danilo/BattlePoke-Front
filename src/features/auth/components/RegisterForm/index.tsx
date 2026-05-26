import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useLogin } from "../../hooks/useLogin";
import { styles } from "./style";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validations/registerSchema';

//formalario para teste de validação de senha e email

export function RegisterForm() {

    const { isRemembered, toggleRemember, handleRegister } = useLogin();

    const { control, handleSubmit,
        formState: {
            errors
        }
    } = useForm({

        resolver:
            yupResolver(
                registerSchema
            )

    });

    return (
            <View style={styles.leftSide}>
            <Text style={styles.authBackgroundText}>Registro</Text>
            <ScrollView contentContainerStyle={styles.formScrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <View style={styles.formHeader}>
                        <Text style={styles.formTitleCyan}>REGISTRO</Text>
                        <Text style={styles.formTitleWhite}>NOVO TREINADOR</Text>
                        <View style={styles.headerUnderline} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Nome de Treinador</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: {
                                onChange,
                                onBlur,
                                value
                            } }) => (

                                <View style={[styles.inputWrapper, errors.email && { borderColor: "red", borderWidth: 2 }]}>
                                    <TextInput
                                        style={[styles.input]}
                                        placeholder="Insira seu nome"
                                        placeholderTextColor="#4A5568"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                </View>
                            )}
                        />
                        {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Sua Senha</Text>
                        <Controller
                            control={control}
                            name="senha"
                            render={({ field: {
                                onChange,
                                onBlur,
                                value
                            } }) => (
                                <View style={[styles.inputWrapper, errors.senha && { borderColor: "red", borderWidth: 2 }]}>
                                    <TextInput
                                        style={[styles.input]}
                                        placeholder="••••••••"
                                        placeholderTextColor="#4A5568"
                                        secureTextEntry
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                </View>
                            )}
                        />
                        {errors.senha && <Text style={{ color: "red" }}>{errors.senha.message}</Text>}
                    </View>


                    <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(handleRegister)}>
                        <Text style={styles.primaryButtonText}>REGISTRAR</Text>
                    </TouchableOpacity>

                    <Link href="/(auth)/Login" asChild>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>JÁ TENHO CONTA</Text>
                        </TouchableOpacity>
                    </Link>

                </View>
            </ScrollView>
        </View>
    )
}