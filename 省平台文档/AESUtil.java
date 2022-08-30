package com.dataacq.system.dataChannel.component;

import com.sn.core.exception.PreconditionCheckFailedException;
import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.security.Security;


public class AESUtil {
    private static final String ENCRYPT_ALG = "AES";
    private static final String CIPHER_MODE = "AES/ECB/PKCS7Padding";
    private static final String ENCODEING;
    private static final int SECRET_KEY_SIZE = 16;
    public static final String SIGN_ALGORITHMS = "SHA1PRNG";

    public AESUtil() {
    }

    public static String encrypt(String passKey, String content) throws Exception {
        try {
            Security.addProvider(new BouncyCastleProvider());
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS7Padding");
            byte[] realKey = getSecretKey(passKey);
            cipher.init(1, new SecretKeySpec(realKey, "AES"));
            byte[] data = cipher.doFinal(content.getBytes(ENCODEING));
            return Base64.encodeBase64String(data);
        } catch (Exception var5) {
            DataChannelModuleLogUtils.DATACHANNEL_LOG.error("AES加密失败：content={},passKey={}", new Object[]{content, passKey, var5});
            throw new PreconditionCheckFailedException("AES加密失败，请联系管理员!");
        }
    }

    public static String decrypt(String passKey, String content) throws Exception {
        try {
            Security.addProvider(new BouncyCastleProvider());
            byte[] decodeBytes = Base64.decodeBase64(content);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS7Padding");
            byte[] realKey = getSecretKey(passKey);
            cipher.init(2, new SecretKeySpec(realKey, "AES"));
            byte[] realBytes = cipher.doFinal(decodeBytes);
            return new String(realBytes, ENCODEING);
        } catch (Exception var6) {
            DataChannelModuleLogUtils.DATACHANNEL_LOG.error("AES解密失败：content={},passKey={}", new Object[]{content, passKey, var6});
            throw new PreconditionCheckFailedException("AES解密失败，可能加密算法与解密算法不匹配，请联系管理员!");
        }
    }

    public static byte[] getSecretKey(String key) throws Exception {
        KeyGenerator keygen = KeyGenerator.getInstance("AES");
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        random.setSeed(key.getBytes(ENCODEING));
        keygen.init(128, random);
        SecretKey originalKey = keygen.generateKey();
        return originalKey.getEncoded();
    }

    public static void main(String[] args) throws Exception {
        String passKey = "lianghuilonglong";
        String content = "abcd密文";
        String pwdMi = encrypt(passKey, content);
        System.out.println("加密的密文:" + pwdMi);
        System.out.println(decrypt(passKey, pwdMi));
    }

    static {
        ENCODEING = StandardCharsets.UTF_8.name();
    }
}
