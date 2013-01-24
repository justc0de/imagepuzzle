package com.justc0de.imagepuzzle;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class TopTimes extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operation = request.getParameter("operation");
		//System.out.println(operation);
		
		if (operation.compareTo("getTopTimes") == 0){
			
			getTopTimes(response);
			
		}else if(operation.compareTo("compareUsersTime") == 0){
			
			compareUsersTime();
		}
	}
	
	private void getTopTimes(HttpServletResponse response){
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			// get latest times from storage then write back to requesting doc
			out.write("Results");

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
	
	private void compareUsersTime(){
		
	}
}