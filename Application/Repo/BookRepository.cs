using Application.Configuration;
using Application.ViewModel;
using Dapper;
using Domain;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _dataContext;
        //public IDbConnection db = new SqlConnection(ConfigurationConnection.connectionString);

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(ConfigurationConnection.connectionString);
            }
        }

        public BookRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<List<BooksViewModel>> GetBookList()
        {
            List<BooksViewModel> bookList = new List<BooksViewModel>();
            //bookList = db.Query<BooksViewModel>(
            //    "select bookName, AspNetUsers.UserName as 'Name', issuedOn, returnDate,isAvailable,isTaken, isRequested " +
            //    "from Books left join AspNetUsers on Books.issuedBy = AspNetUsers.ID").ToList();
            //return bookList;

            using (IDbConnection conn = Connection)
            {
                string query =
                    "select Books.Id,bookName, AspNetUsers.UserName as 'Name',anu.UserName as 'requestedBy', issuedOn, returnDate,isAvailable,isTaken, isRequested, isReturned from Books " + 
                    "left join AspNetUsers on Books.issuedBy = AspNetUsers.ID " +
                    "Left join AspNetUsers anu on Books.requestedBy = anu.ID ";
                conn.Open();
                var result = await conn.QueryAsync<BooksViewModel>(query);
                return result.ToList();
            }
        }

        public async Task<List<Books>> GetBooks()
        {
            var result = await _dataContext.Books.ToListAsync();
            return result;
        }
    }
}
