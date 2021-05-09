package hr.fer.zavrsni.webApp;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
@EnableJpaRepositories ("hr.fer.zavrsni.webApp.dao")
@ComponentScan("hr.fer.zavrsni.webApp.model")
@EntityScan("hr.fer.zavrsni.webApp.model")  
@SpringBootApplication
@Configuration
@EnableAutoConfiguration()
@EnableTransactionManagement
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}
	
	

}
