package hr.fer.zavrsni.webApp;


import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}
	
	@Bean
	public FilterRegistrationBean simpleCorsFilter() {  	
    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();  
    	CorsConfiguration config = new CorsConfiguration();  
    	config.setAllowCredentials(true); 	config.setAllowedOrigins(Collections.singletonList("http://localhost:3000")); 
    	config.setAllowedMethods(Collections.singletonList("*"));  
    	config.setAllowedHeaders(Collections.singletonList("*"));  
    	source.registerCorsConfiguration("/**", config);  
    	FilterRegistrationBean bean = new FilterRegistrationBean<>(new CorsFilter(source));
    		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);  
    	return bean;  
	}   
	
	

}
