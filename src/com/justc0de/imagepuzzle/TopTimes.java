package com.justc0de.imagepuzzle;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class TopTimes extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operation = request.getParameter("operation");
		
		if (operation.compareTo("getTopTimes") == 0){
			
			getTopTimes(response);
			
		}else if(operation.compareTo("compareUsersTime") == 0){
			
			compareUsersTime(response, 
					Integer.parseInt(request.getParameter("gridSize")),
					request.getParameter("usersName"),
					new Date(Long.parseLong(request.getParameter("usersTime"))));
		}
	}
	
	private void getTopTimes(HttpServletResponse response){
		try {
			
			// get latest times from storage then write back to requesting doc
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			out.write("Results");

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
	
	private void compareUsersTime(HttpServletResponse response, int gridSize, String usersName, Date usersTime){
		
		//System.out.println(String.valueOf(gridSize));
		//System.out.println(String.valueOf(usersName));
		//System.out.println(String.valueOf(usersTime.getTime()));
		
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			out.write("Data in servlet");

		} catch (IOException io) {
			io.printStackTrace();
		}
	}
}