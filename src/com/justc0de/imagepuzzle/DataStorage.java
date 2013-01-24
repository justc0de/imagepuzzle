package com.justc0de.imagepuzzle;

import java.util.Date;
import java.util.Vector;

public interface DataStorage {
	
	public Vector<TimeEntry> getTopTimes();
	public Date getTopTimeForGridSize(int gridSize);
	public void setTopTimeForGridSize(TimeEntry timeEntry);
}