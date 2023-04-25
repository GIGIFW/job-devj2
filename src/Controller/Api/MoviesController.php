<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;
use Symfony\Component\VarDumper\VarDumper;


class MoviesController extends AbstractController
{

    #[Route('/api/movies/decrescente')]
    public function list(Connection $db): Response
    {
        $rows = $db->createQueryBuilder()
            ->select("m.*")
            ->from("movies", "m")
            ->orderBy("m.release_date", "DESC")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();

        return $this->json([
            "movies" => $rows
        ]);
    }

    #[Route('/api/movies/crescente')]
    public function crescente(Connection $db): Response
    {
        $rows = $db->createQueryBuilder()
            ->select("m.*")
            ->from("movies", "m")
            ->orderBy("m.release_date")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();

        return $this->json([
            "movies" => $rows
        ]);
    }


    #[Route('/api/movies/rating')]
    public function rating(Connection $db): Response
    {
        $rows = $db->createQueryBuilder()
            ->select("m.*")
            ->from("movies", "m")
            ->orderBy("m.rating", "DESC")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();

        return $this->json([
            "movies" => $rows
        ]);
    }


    #[Route('/api/movies/filter')]
    public function filtro(Connection $db, Request $request): Response
    {
        $genreId = $request->query->get('filtro');

        $queryBuilder = $db->createQueryBuilder()
            ->select("m.*, g.*")
            ->from("movies", "m")
            ->leftJoin("m", "movies_genres", "g", "g.movie_id = m.id")
            ->orderBy("m.rating", "DESC")
            ->setMaxResults(50);

        $queryBuilder->andWhere('g.genre_id = :genre_id')
            ->setParameter('genre_id', $genreId);

        $rows = $queryBuilder->executeQuery()->fetchAllAssociative();


        return $this->json([
            "movies" => $rows
        ]);
    }
}