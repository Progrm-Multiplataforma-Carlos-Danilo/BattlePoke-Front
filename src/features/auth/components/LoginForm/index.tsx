import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useLogin } from "../../hooks/useLogin";
import { styles } from "./style";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validations/loginSchema';

//formalario para teste de validação de senha e email

export function LoginForm() {

    const { isRemembered, toggleRemember, handleLogin } = useLogin();

    const { control, handleSubmit,
        formState: {
            errors
        }
    } = useForm({

        resolver:
            yupResolver(
                loginSchema
            ),
        defaultValues: {
            email: '',
            senha: ''
        }

    });

    return (

        <View style={styles.rightSide}>
            <Text style={styles.authBackgroundText}>Login</Text>
            <ScrollView contentContainerStyle={styles.formScrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <View style={styles.formHeader}>
                        <Text style={styles.formTitleCyan}>TREINADOR</Text>
                        <Text style={styles.formTitleWhite}>AUTENTICAÇÃO</Text>
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

                    <View style={styles.formOptions}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={toggleRemember}
                        >
                            <View style={[styles.checkbox, isRemembered && styles.checkboxChecked]}>
                                {isRemembered && <Feather name="check" size={12} color="#00D2FF" />}
                            </View>
                            <Text style={styles.checkboxLabel}>Lembrar-me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(handleLogin)}>
                        <Text style={styles.primaryButtonText}>INICIAR BATALHA</Text>
                    </TouchableOpacity>

                    <Link href="/(auth)/Register" asChild>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>INSCREVER-SE COMO NOVO TREINADOR</Text>
                        </TouchableOpacity>
                    </Link>

                </View>
            </ScrollView>
        </View>
    )
}