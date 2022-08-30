package com.sn.core.utils;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Security;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

/**
 * RSA加密工具类
 * 
 */
public class RSAUtils {
    /**
     * 密钥大小。这是特定于算法的度量（如模长度），以位数的形式指定
     */
    public static final Integer KEY_SIZE = 1024;

    /**
     * 加密算法RSA 生成实现指定摘要算法的 KeyPairGenerator对象
     */
    public static final String KEY_ALGORITHM = "RSA";

    /**
     * 填充方案 具体可以参照JdkAPI
     */
    public static final String PADDING = "RSA/NONE/PKCS1Padding";

    /**
     * 提供者 具体可以参照JdkAPI
     */
    public static final String PROVIDER = "BC";

    /**
     * 自动生成密钥对（公钥和私钥） 2017-7-28 下午3:25:38 
     * 
     * @return
     * @throws NoSuchAlgorithmException
     */
    public static HashMap<String, Object> getRSAKey() throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(KEY_ALGORITHM);
        SecureRandom random = new SecureRandom();
        keyPairGenerator.initialize(KEY_SIZE, random);
        // 生成钥匙对
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        // 得到公钥
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        // 得到私钥
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("publicKey", Base64.encodeBase64String(publicKey.getEncoded()));
        map.put("privateKey", Base64.encodeBase64String(privateKey.getEncoded()));
        return map;
    }

    /**
     * 生成公钥 2018年12月19日 上午9:49:15 
     * 
     * @param publicKey
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     */
    public static Key getPublicKey(String publicKeyStr) throws Exception {
        byte[] keyBytes = Base64.decodeBase64(publicKeyStr);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
        PublicKey publicKey = keyFactory.generatePublic(keySpec);
        return publicKey;
    }

    /**
     * 生成私钥 2018年12月19日 上午9:49:30 
     * 
     * @param privateKey
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     */
    public static Key getPrivateKey(String privateKeyStr) throws Exception {
        byte[] keyBytes = Base64.decodeBase64(privateKeyStr);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
        PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
        return privateKey;
    }

    /**
     * 公钥加密 2017-7-28 下午4:04:09
     * 
     * @param publicKey
     *            公钥
     * @param psd_ming
     *            需要加密的内容(明文)
     * @return
     * @throws Exception
     */
    public static String encryptByPublicKeyStr(Key publicKey, String psd_ming) throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        Cipher cipher = Cipher.getInstance(PADDING, PROVIDER);
        // 设置为加密模式
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        // 对数据进行加密
        byte[] result = cipher.doFinal(psd_ming.getBytes());
        String psd_mi = Base64.encodeBase64String(result);
        return psd_mi;
    }

    /**
     * 私钥解密 2017-7-28 下午5:25:09 
     * 
     * @param privateKey
     *            私钥
     * @param psd_mi
     *            需要解密的内容（密文）
     * @return
     * @throws Exception
     */
    public static String decryptByPrivateKeyStr(Key privateKey, String psd_mi) throws Exception {
        byte[] parseHexStr2Byte = Base64.decodeBase64(psd_mi);
        Security.addProvider(new BouncyCastleProvider());
        Cipher cipher = Cipher.getInstance(PADDING, PROVIDER);
        // 设置为解密模式，用私钥解密
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        // 解密
        byte[] data = cipher.doFinal(parseHexStr2Byte);
        String pwd_ming = new String(data, "UTF-8");
        return pwd_ming;
    }

}