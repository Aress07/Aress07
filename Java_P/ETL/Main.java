package org.example;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
import org.json.CDL;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Main {
    private static final String BASE_URL = "https://jsonplaceholder.typicode.com/users";
    private static final int CONNECT_TIMEOUT = 5000;
    private static final int READ_TIMEOUT = 10000;

    public static void main(String[] args) {
        String filterParamName = "id";
        String filterParamValue = "5";
        String csvFilePath = "user.csv";

        try {
            // Build the URL with query parameters
            String fullURL = buildURL(BASE_URL, filterParamName, filterParamValue);
            System.out.println("Fetching data from: " + fullURL);

            // HTTP request
            String jsonResponse = makeHttpRequest(fullURL);
            System.out.println("JSON Response received successfully");

            // Convert JSON to CSV
            convertJsonToCsv(jsonResponse, csvFilePath);
            System.out.println("CSV file created successfully: " + csvFilePath);

        } catch (IOException | JSONException e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static String buildURL(String baseURL, String paramName, String paramValue) throws IOException {
        StringBuilder urlBuilder = new StringBuilder(baseURL);
        urlBuilder.append("?");
        urlBuilder.append(paramName).append("=").append(URLEncoder.encode(paramValue, StandardCharsets.UTF_8));
        return urlBuilder.toString();
    }

    private static String makeHttpRequest(String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        try {
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Java JSON-CSV Converter/1.0");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(CONNECT_TIMEOUT);
            connection.setReadTimeout(READ_TIMEOUT);

            int responseCode = connection.getResponseCode();
            System.out.println("HTTP Response Code: " + responseCode);

            BufferedReader reader;
            if (responseCode >= 200 && responseCode < 300) {
                reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
            } else {
                reader = new BufferedReader(new InputStreamReader(connection.getErrorStream(), StandardCharsets.UTF_8));
                throw new IOException("HTTP request failed with response code: " + responseCode);
            }

            StringBuilder responseBody = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBody.append(line).append("\n");
            }
            reader.close();

            return responseBody.toString().trim();

        } finally {
            connection.disconnect();
        }
    }

    private static void convertJsonToCsv(String jsonResponse, String filePath) throws JSONException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(jsonResponse);

        JSONArray jsonArray;
        if (rootNode.isArray()) {
            jsonArray = new JSONArray(jsonResponse);
        } else {
            jsonArray = new JSONArray();
            jsonArray.put(new JSONObject(jsonResponse));
        }

        JSONArray flattenedArray = new JSONArray();
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject originalObject = jsonArray.getJSONObject(i);
            JSONObject flattenedObject = flattenJsonObject(originalObject);
            flattenedArray.put(flattenedObject);
        }

        // Convert to CSV
        String csvString = CDL.toString(flattenedArray);
        File file = new File(filePath);
        FileUtils.writeStringToFile(file, csvString, String.valueOf(StandardCharsets.UTF_8));
    }

    private static JSONObject flattenJsonObject(JSONObject jsonObject) throws JSONException {
        JSONObject flattened = new JSONObject();
        flattenJsonObjectRecursive(jsonObject, "", flattened);
        return flattened;
    }

    private static void flattenJsonObjectRecursive(JSONObject obj, String prefix, JSONObject result) throws JSONException {
        java.util.Iterator<String> keys = obj.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            String newKey = prefix.isEmpty() ? key : prefix + "_" + key;
            Object value = obj.get(key);

            if (value instanceof JSONObject) {
                flattenJsonObjectRecursive((JSONObject) value, newKey, result);
            } else if (value instanceof JSONArray) {
                result.put(newKey, value.toString());
            } else {
                result.put(newKey, value);
            }
        }
    }
}